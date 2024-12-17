import clsx from 'clsx'

const Card = ({ children, className, onClick }) => {
  return (
    <div
      className={clsx('bg-gray-80 border-gray-70 border-[1px] rounded-[8px]', className)}
      onClick={onClick ? onClick : null}
    >
      {children}
    </div>
  )
}

export default Card
