import React, { useState, forwardRef, useImperativeHandle } from 'react'
import LabelWithPopover from './LabelWithPopover'

export interface InputNumbersProps {
  /**
   * Input field ID
   */
  id: string
  /**
   * Label text for the input
   */
  label: string
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Optional description for the popover
   */
  description?: string
  /**
   * Callback when input value changes
   */
  onChange: (value: string) => void
}

export interface InputNumbersRef {
  validate: () => boolean
}

const InputNumbers: React.ForwardRefRenderFunction<InputNumbersRef, InputNumbersProps> = (
  {
    id,
    label,
    placeholder,
    description,
    onChange
  },
  ref
) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    if (newValue === '') {
      setError('This field is required')
    } else {
      setError('')
    }
    onChange(newValue)
  }

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (value === '') {
        setError('This field is required')
        return false
      }
      setError('')
      return true
    }
  }))

  return (
    <div>
      {description ? (
        <LabelWithPopover
          htmlFor={id}
          label={label}
          description={description}
        />
      ) : (
        <label htmlFor={id} className="block text-white mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type="number"
        className={`w-full p-4 bg-gray-80 border border-gray-70 text-white rounded-lg placeholder-gray-500 ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-right">{error}</p>}
    </div>
  )
}

export default forwardRef(InputNumbers)
