import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ConnectLink from '../../connect/ConnectLink'

export interface HeaderProps {
  /**
   * Path to the logo image or React Component
   */
  logo?: string | React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ logo = '/qubic.svg' }) => {
  // Try to access router context - if it fails, we know Router isn't available
  let hasRouter = true
  try {
    useNavigate()
  } catch {
    hasRouter = false
  }

  const renderLogo = () => {
    if (typeof logo === 'string') {
      return <img src={logo} alt="logo" />
    } else if (React.isValidElement(logo)) {
      return logo
    } else {
      return <></>
    }
  }

  const LogoWrapper = hasRouter ? (
    <Link to="/">{renderLogo()}</Link>
  ) : (
    <a href="/">{renderLogo()}</a>
  )

  return (
    <div
      className="
      fixed h-[78px] flex w-full z-10 top-0 gap-6 justify-center items-center
      border-b border-solid border-gray-70 bg-gray-90
    "
    >
      {LogoWrapper}
      <ConnectLink />
    </div>
  )
}

export default Header
