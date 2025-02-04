import { SVGProps } from 'react'

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-20 w-20 text-gray-50 transition-transform duration-300 rotate-0"
    {...props}
  >
    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>

  </svg>
)

export default ArrowDownIcon
