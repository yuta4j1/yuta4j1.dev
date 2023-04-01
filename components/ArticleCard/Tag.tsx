import React from 'react'
import classNames from 'classnames'

export const Tag: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <span
      className={classNames(
        'px-2',
        'py-1',
        'rounded-sm',
        'bg-blue-50',
        'text-blue-500',
        'text-xs',
        'mr-4'
      )}
    >
      {children}
    </span>
  )
}
