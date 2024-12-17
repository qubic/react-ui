import React, { createContext, useContext, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { QubicHelper } from '@qubic-lib/qubic-ts-library/dist/qubicHelper'
import Crypto from '@qubic-lib/qubic-ts-library/dist/crypto'
import { seedStringToBytes, digestBytesToString, publicKeyStringToBytes, publicKeyBytesToString } from '@qubic-lib/qubic-ts-library/dist/converter/converter.js'
import { MetaMaskProvider } from './MetamaskContext'
import { connectTypes, defaultSnapOrigin, tickOffset } from './config'

const QubicConnectContext = createContext()

export function QubicConnectProvider({ children }) {
  const [connected, setConnected] = useState(false)
  const [wallet, setWallet] = useState(null)
  const [showConnectModal, setShowConnectModal] = useState(false)

  const httpEndpoint = 'https://rpc.qubic.org' // live system
  const qHelper = new QubicHelper()

  useEffect(() => {
    const wallet = localStorage.getItem('wallet')
    if (wallet) {
      setWallet(wallet)
      setConnected(true)
    }
  }, [])

  /**
   * Connect DAPP with wallet or use private keys
   *
   * @param {
   *  type: string,
   *  publicKey: string,
   *  privateKey?: string,
   * } wallet
   */
  const connect = (wallet) => {
    localStorage.setItem('wallet', wallet)
    setWallet(wallet)
    setConnected(true)
  }

  const disconnect = () => {
    localStorage.removeItem('wallet')
    setWallet(null)
    setConnected(false)
  }

  const toggleConnectModal = () => {
    setShowConnectModal(!showConnectModal)
  }

  function uint8ArrayToBase64(uint8Array) {
    const binaryString = String.fromCharCode.apply(null, uint8Array)
    return btoa(binaryString)
  }

  const getMetaMaskPublicId = async (accountIdx = 0, confirm = false) => {
    return await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'getPublicId',
          params: {
            accountIdx,
            confirm,
          }
        },
      },
    })
  }

  const getMetaMaskSignedTx = async (tx, offset, accountIdx = 0) => {
    // Convert the binary buffer to a base64 string
    const base64Tx = btoa(String.fromCharCode(...tx))

    return await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: {
          method: 'signTransaction',
          params: {
            base64Tx,
            accountIdx,
            offset,
          }
        },
      },
    })
  }

  const getTickInfo = async () => {
    console.log('getTickInfo');
    const tickResult = await fetch(`${httpEndpoint}/v1/tick-info`)
    const tick = await tickResult.json()
    // check if tick is valid
    if (!tick || !tick.tickInfo) {
      console.warn('getTickInfo: Invalid tick')
      return {tickInfo: {tick: 0, epoch: 0}}
    }
    return tick.tickInfo
  }

  const getBalance = async (publicId) => {
    console.log('getBalance: for publicId ', publicId);
    const accountResult = await fetch(`${httpEndpoint}/v1/balances/${publicId}`)
    const results = await accountResult.json()
    // check if info is valid
    if (!results || !results.balance) {
      console.warn('getBalance: Invalid balance')
      return {balance: {id: publicId, balance: 0}}
    }
    return results
  }

  const getPaymentTx = async (sender, receiver, amount, tick) => {
    const destPublicKey = publicKeyStringToBytes(receiver).slice(0, qHelper.PUBLIC_KEY_LENGTH)
    const senderPublicId = publicKeyStringToBytes(sender).slice(0, qHelper.PUBLIC_KEY_LENGTH)
    const tx = new Uint8Array(qHelper.TRANSACTION_SIZE).fill(0)
    const txView = new DataView(tx.buffer)
    let offset = 0
    let i = 0
    for (i = 0; i < qHelper.PUBLIC_KEY_LENGTH; i++) {
        tx[i] = senderPublicId[i]
    }
    offset = i
    for (i = 0; i < qHelper.PUBLIC_KEY_LENGTH; i++) {
        tx[offset + i] = destPublicKey[i]
    }
    offset += i
    txView.setBigInt64(offset, BigInt(amount), true)
    offset += 8
    txView.setUint32(offset, tick, true)
    offset += 4
    txView.setUint16(offset, 0, true)
    offset += 2
    txView.setUint16(offset, 0, true)
    offset += 2

    return {
      tx,
      offset
    }
  }

  const getSignedTx = async (tx, offset) => {
    // check connectType
    if (!connectTypes.includes(wallet.connectType)) {
      throw new Error('Unsupported connectType: ' + wallet.connectType)
    }

    let signedtx = null

    if (wallet.connectType === 'mmSnap') {
      const mmResult = await getMetaMaskSignedTx(tx, offset)
      // Convert the base64 string to a binary buffer
      const binaryTx = atob(mmResult.signedTx)
      signedtx = new Uint8Array(binaryTx.length);
      for (let i = 0; i < binaryTx.length; i++) {
        signedtx[i] = binaryTx.charCodeAt(i);
      }
    }else{
      const qCrypto = await Crypto
      const idPackage = await qHelper.createIdPackage(wallet.privateKey)
      const digest = new Uint8Array(qHelper.DIGEST_LENGTH)
      const toSign = tx.slice(0, offset)

      qCrypto.K12(toSign, digest, qHelper.DIGEST_LENGTH)
      signedtx = qCrypto.schnorrq.sign(idPackage.privateKey, idPackage.publicKey, digest)
    }

    // Copy the signed transaction to the transaction buffer
    tx.set(signedtx, offset)
    offset += qHelper.SIGNATURE_LENGTH

    return {
      tx,
      offset
    }
  }

  const broadcastTx = async (tx) => {
    const url = `${httpEndpoint}/v1/broadcast-transaction`
    const txEncoded = uint8ArrayToBase64(tx)
    const body = {encodedTransaction: txEncoded}
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
      })
      // Parse the JSON response
      const result = await response.json()
      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`)
        console.log('broadcastTx:', response)
      }
      return {
        status: response.status,
        result
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <MetaMaskProvider>
        <QubicConnectContext.Provider value={{
          connected, wallet, showConnectModal,
          connect, disconnect, toggleConnectModal,
          getMetaMaskPublicId, getSignedTx, broadcastTx,
          getTickInfo, getBalance, tickOffset, getPaymentTx,
        }}>
          {children}
        </QubicConnectContext.Provider>
      </MetaMaskProvider>
    </>
  )
}

export function useQubicConnect() {
    const context =  useContext(QubicConnectContext)
    if (context === undefined) {
      throw new Error("useQubicConnect() hook must be used within a <QubicConnectProvider>")
    }
    return context
}
