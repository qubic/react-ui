/**
 * Format number input to 100,000,000 format
 * @param amount - The number to format
 * @param separator - The separator to use between thousands (default: ',')
 * @returns Formatted string representation of the number
 */
export const formatQubicAmount = (amount: number | string, separator: string = ','): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator).replace('.0', '')
}

/**
 * Truncate the middle of a string, replacing removed characters with '...'
 * @param str - The string to truncate
 * @param charsToRemove - Number of characters to remove from the middle
 * @returns Truncated string with '...' in the middle
 */
export const truncateMiddle = (str: string, charsToRemove: number): string => {
    const length = str.length
    const start = Math.floor((length - charsToRemove) / 2)
    const end = start + charsToRemove

    return str.slice(0, start) + '...' + str.slice(end)
}

/**
 * Sum all numbers in an array
 * @param arr - Array of numbers to sum
 * @returns Sum of all numbers in the array
 */
export const sumArray = (arr: number[]): number => arr.reduce((acc, curr) => acc + curr, 0)

/**
 * Convert Uint8Array to hex string
 * @param byteArray - The Uint8Array to convert
 * @returns Hexadecimal string representation of the byte array
 */
export const byteArrayToHexString = (byteArray: Uint8Array): string => {
    return Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Check if a Qubic address is valid
 * @param toAddress - The address to validate
 * @returns True if address is valid, false otherwise
 */
export const isAddressValid = (toAddress: string): boolean =>
    toAddress.length === 60 && /^[A-Z]+$/.test(toAddress)

/**
 * Check if a number is positive
 * @param amount - The number to check
 * @returns True if number is positive, false otherwise
 */
export const isPositiveNumber = (amount: number | string): boolean =>
    !isNaN(Number(amount)) && Number(amount) > 0

/**
 * Check if an amount is valid (positive integer)
 * @param amount - The amount to validate
 * @returns True if amount is a valid positive integer, false otherwise
 */
export const isAmountValid = (amount: number): boolean =>
    isPositiveNumber(amount) && amount % 1 === 0
