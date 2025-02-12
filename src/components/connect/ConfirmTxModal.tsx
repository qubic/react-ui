import React, { useEffect, useState } from "react"
import Card from "../ui/Card"
import Button from "../ui/Button"
import CloseIcon from '../../assets/close.svg'
import { useQubicConnect } from "./QubicConnectContext"

interface Transaction {
  title: string
  description: string
  targetTick?: number
}

interface ConfirmResult {
  txResult?: {
    status: number
  }
  targetTick: number
}

interface ConfirmTxModalProps {
  /**
   * Transaction to confirm
   */
  tx: Transaction
  /**
   * Whether the modal is open
   */
  open: boolean
  /**
   * Callback when modal is closed
   */
  onClose: () => void
  /**
   * Callback when transaction is confirmed
   */
  onConfirm: () => Promise<ConfirmResult>
  /**
   * Backend tick offset
   */
  beTickOffset?: number
}

const ConfirmTxModal: React.FC<ConfirmTxModalProps> = ({
  tx,
  open,
  onClose,
  onConfirm,
  beTickOffset = 3
}) => {
  const { getTickInfo } = useQubicConnect()
  const [confirmedTx, setConfirmedTx] = useState<ConfirmResult | null>(null)
  const [initialTick, setInitialTick] = useState<number | null>(null)
  const [tick, setTick] = useState<number | null>(null)

  const refetchInterval = 3000

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined

    const fetchTick = async () => {
      const t = await getTickInfo()
      setTick(t.tick)
    }

    if (confirmedTx) {
      fetchTick() // Fetch immediately when confirmedTx is set
      intervalId = setInterval(fetchTick, refetchInterval)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    } // Cleanup interval on unmount or when confirmedTx changes
  }, [confirmedTx, getTickInfo])

  useEffect(() => {
    if (tick !== null && confirmedTx !== null && initialTick !== null) {
      const targetTick = confirmedTx.targetTick
      const normalizedTick = ((tick - initialTick) / (targetTick - initialTick)) * 100
      const widthPercentage = Math.min(Math.max(normalizedTick, 0), 100)

      if (widthPercentage >= 100) {
        onClose()
      }
    }
  }, [tick, confirmedTx, initialTick, onClose])

  const startTickFetchInterval = async (cTx: ConfirmResult) => {
    cTx.targetTick = cTx.targetTick + beTickOffset // add ticks as quottery backend buffer
    // Fetch initial tick value
    const initialTickInfo = await getTickInfo()
    setInitialTick(initialTickInfo.tick)
    setConfirmedTx(cTx)
  }

  return (
    <>
      {open && (
        <div
          className="w-full p-5 h-full fixed top-0 left-0 overflow-x-hidden overflow-y-auto z-50 bg-smoke-light flex"
          onClick={() => onClose()}
        >
          <Card
            className="relative p-8 w-full max-w-md m-auto flex-col flex"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl text-white">
                qubic <span className="text-primary-40">connect</span>
              </div>
              <img
                src={CloseIcon}
                onClick={onClose}
                alt="Close Modal Icon"
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {confirmedTx && (
                <>
                  <p className="text-white">
                    Current Tick: {tick} / {confirmedTx.targetTick}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width:
                          tick && initialTick
                            ? `${Math.min(
                                Math.max(
                                  ((tick - initialTick) / (confirmedTx.targetTick - initialTick)) *
                                    100,
                                  0
                                ),
                                100
                              )}%`
                            : "0%",
                      }}
                    ></div>
                  </div>
                </>
              )}

              {!confirmedTx && (
                <>
                  <p className="text-white">{tx.description}</p>
                  {/* <ConfirmSlider onConfirm={onConfirm} /> */}
                  <Button
                    label="Confirm"
                    primary={true}
                    onClick={async () => {
                      const confirmResult = await onConfirm()
                      // check if confirmed has finished with status 200
                      if (confirmResult.txResult && confirmResult.txResult.status !== 200) return
                      // start fetching tick and show progress bar
                      startTickFetchInterval(confirmResult)
                    }}
                  />
                </>
              )}
              <Button label="Close" onClick={() => onClose()} />
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default ConfirmTxModal
