import React, { useState, useRef, useEffect } from 'react'

export interface DropdownOption {
  label: string
  value: string | number
}

export interface DropdownProps {
  /**
   * Label displayed above the dropdown
   */
  label: string
  /**
   * Array of options to display in the dropdown
   */
  options: DropdownOption[]
  /**
   * Currently selected option index
   */
  selected: number
  /**
   * Callback to update selected option index
   */
  setSelected: (index: number) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  setSelected
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div ref={dropdownRef} className="relative flex flex-col items-start">
          <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
            <span className="text-primary-40 font-space cursor-pointer">
              {label}
            </span>
            <span className="ml-2 text-primary-40">▼</span>
          </div>
          {options[selected] && (
            <span className="mt-1 text-grey-400">
              {options[selected].label}
            </span>
          )}
          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            setSelected(index)
                            toggleDropdown()
                        }}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
          )}
        </div>
    )
}

export default Dropdown
