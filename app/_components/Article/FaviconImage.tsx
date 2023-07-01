'use client'
import React from 'react'
import classNames from 'classnames'

export const FaviconImage: React.FC<{ src: string }> = ({ src }) => {
  return (
    <img className={classNames('h-4')} src={src} alt="" onError={e => {}} />
  )
}
