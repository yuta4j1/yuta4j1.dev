import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import '../../styles/globals.css'

export const Header = () => {
  return (
    <nav
      className={classNames('border-solid', 'border-b-2', 'border-gray-200')}
    >
      <ul className={classNames('list-none', 'flex')}>
        <li className={classNames('p-4')}>
          <p className={classNames('font-semibold', 'text-lg')}>
            <Link href={'/'}>yuta4j1.dev</Link>
          </p>
        </li>
      </ul>
    </nav>
  )
}
