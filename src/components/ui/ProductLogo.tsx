import QubicLogo from '../../assets/qubic.svg';

export interface ProductLogoProps {
  name: string; // name of your Qubic product
  className?: string;
}

/**
 * Qubic Product Logo
 */
const ProductLogo = ({ name, className }: ProductLogoProps): JSX.Element => {
  return (
    <div className={"flex items-center " + (className ? ` ${className}` : "")}>
      <img src={QubicLogo} alt="Qubic Logo" className="w-6 h-6 mt-1" />
      <div className="text-2xl text-white">qubic</div>
      <div className="ml-1 text-2xl text-primary-40">{name}</div>
    </div>
  )
}

export default ProductLogo;
