import React from 'react'

export interface MinMaxSpanProps {
  /**
   * Object containing arrays of values
   */
  values: {
    [key: string]: number[]
  }
  /**
   * Property key to access the array of values
   */
  prop: string
}

/**
 * Helper component to display the minimum and maximum values from an array
 * If min and max are the same, displays a single value
 * Otherwise displays a range in the format "min - max"
 */
const MinMaxSpan: React.FC<MinMaxSpanProps> = ({ values, prop }) => {
  // get smallest and highest fee from values[prop] array
  const min = Math.min(...values[prop])
  const max = Math.max(...values[prop])

  // if min and max are the same, return just one value
  if (min === max) {
    return <span>{min}</span>
  }

  // otherwise return range
  return <span>{min} - {max}</span>
}

export default MinMaxSpan
