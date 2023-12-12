'use client'
import type { FC } from 'react'
import classNames from 'classnames'

export const FaviconImage: FC<{ src: string }> = ({ src }) => {
  return (
    <img
      className={classNames('h-4', 'w-4')}
      src={src}
      onError={e => {}}
      alt=""
    />
  )
}
