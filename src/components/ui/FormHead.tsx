import React from 'react'
import arrowLeftIcon from '../../assets/arrow-left.svg'

export interface FormHeadProps {
  /**
   * Callback function when back button is clicked
   */
  onBack: () => void
  /**
   * Title text to display
   */
  title: string
}

const FormHead: React.FC<FormHeadProps> = ({ onBack, title }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <button onClick={onBack} className="text-white">
        <img src={arrowLeftIcon} alt="Back" className="cursor-pointer" />
      </button>
      <h1 className="text-white text-[25px] font-semibold">{title}</h1>
    </div>
  )
}

export default FormHead
