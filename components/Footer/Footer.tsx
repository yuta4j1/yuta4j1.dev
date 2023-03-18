import React from 'react'
import classNames from 'classnames'

export const Footer = () => {
  return (
    <footer
      className={classNames(
        'flex',
        'justify-center',
        'py-8',
        'border-solid',
        'border-t-2',
        'items-center'
      )}
    >
      <div
        className={classNames(
          'sm:w-11/12',
          'md:w-11/12',
          'lg:w-9/12',
          'xl:w-7/12',
          'w-11/12'
        )}
      >
        <span className={classNames('w-full', 'text-center')}>
          ©️ 2022 yuta4j1. All rights reserved. This site was designed by
          yuta4j1.
        </span>
      </div>
    </footer>
  )
}
