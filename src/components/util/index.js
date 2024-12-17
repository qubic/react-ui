// format number input to 100,000,000 format
export const formatQubicAmount = (amount, seperator = ',') => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperator).replace('.0','')
}

export const truncateMiddle = (str, charsToRemove) => {
    const length = str.length
    const start = Math.floor((length - charsToRemove) / 2)
    const end = start + charsToRemove

    return str.slice(0, start) + '...' + str.slice(end)
}

export const sumArray = (arr) => arr.reduce((acc, curr) => acc + curr, 0)

// Convert Uint8Array to hex string
export const byteArrayToHexString = (byteArray) => {
  const hexString = Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('')
  return hexString
}

// Basic validation checks
export const isAddressValid = (toAddress) => toAddress.length === 60 && /^[A-Z]+$/.test(toAddress)
export const isPositiveNumber = (amount) => !isNaN(Number(amount)) && Number(amount) > 0
export const isAmountValid = (amount) => isPositiveNumber(amount) && amount % 1 === 0
