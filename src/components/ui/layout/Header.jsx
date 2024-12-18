import { Link, useNavigate } from 'react-router-dom'
import ConnectLink from '../../connect/ConnectLink'

const Header = ({logo = '/qubic.svg'}) => {
  // Try to access router context - if it fails, we know Router isn't available
  let hasRouter = true;
  try {
    useNavigate();
  } catch {
    hasRouter = false;
  }

  const LogoWrapper = hasRouter ? (
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
  ) : (
    <a href="/">
      <img src={logo} alt="logo" />
    </a>
  );

  return (
    <div className="
      fixed h-[78px] flex w-full z-10 top-0 gap-6 justify-center items-center
      border-b border-solid border-gray-70 bg-gray-90
    ">
      {LogoWrapper}
      <ConnectLink />
    </div>
  )
}

export default Header
