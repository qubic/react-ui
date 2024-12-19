import React from 'react'

export interface InputRegExProps {
  /**
   * Input field ID
   */
  id: string
  /**
   * Label text for the input
   */
  label: string
  /**
   * Initial value for the input
   */
  initialValue: string
  /**
   * Regular expression for input validation
   */
  regEx?: RegExp
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Callback when input value changes
   */
  onChange: (value: string) => void
}

const InputRegEx: React.FC<InputRegExProps> = ({
  id,
  label,
  initialValue,
  regEx = /^\d{0,2}(\.\d{0,2})?$/,
  placeholder = '00.00',
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Allow only numbers and dot, and ensure format like 00.00
    if (regEx.test(value)) {
      onChange(value)
    }
  }

  return (
    <div>
      <label htmlFor={id} className="block text-white mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="w-full p-4 bg-gray-80 border border-gray-70 text-white rounded-lg placeholder-gray-500"
        value={initialValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputRegEx
