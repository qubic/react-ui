import clsx from 'clsx'
import { ReactNode, MouseEvent } from 'react'

export interface CardProps {
  /**
   * Card contents
   */
  children: ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Optional click handler
   */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      className={clsx('bg-gray-80 border-gray-70 border-[1px] rounded-[8px]', className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
