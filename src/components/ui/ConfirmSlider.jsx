import React, { useState } from 'react'

const ConfirmSlider = ({ onConfirm }) => {
  const [sliderValue, setSliderValue] = useState(0)

  const handleSliderChange = (e) => {
    const value = e.target.value
    setSliderValue(value)

    if (value === '100') {
      onConfirm(true)
    } else {
      onConfirm(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-700">Slide to confirm</span>
        <span className="text-gray-700">{sliderValue}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  )
}

export default ConfirmSlider
