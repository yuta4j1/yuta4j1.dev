import React from 'react'
import classNames from 'classnames'

export const Tag: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <span className={classNames('px-4', 'py=2', 'rounded-sm')}>{children}</span>
  )
}
