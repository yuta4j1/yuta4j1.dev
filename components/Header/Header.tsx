import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'
import '../../styles/globals.css'

export const Header = () => {
  return (
    <nav
      className={classNames(
        'flex',
        'justify-center',
        'border-solid',
        'border-b-2',
        'border-gray-200'
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
        <ul className={classNames('list-none', 'flex')}>
          <li className={classNames('p-4', 'sm:p-8', 'md:p-4')}>
            <p className={classNames('font-semibold', 'text-lg')}>
              <Link href={'/'}>yuta4j1.dev</Link>
            </p>
          </li>
          <li className={classNames('ml-auto', 'mt-auto', 'mb-auto')}>
            <a
              href="https://github.com/yuta4j1/yuta4j1.dev"
              target={'_blank'}
              aria-label="GitHub Repository"
            >
              <FiGithub size={24} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
