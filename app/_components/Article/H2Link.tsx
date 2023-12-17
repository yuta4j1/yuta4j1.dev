'use client'

import type { FC, ReactNode } from 'react'

export const H2Link: FC<{
  locationHash: string
  children: ReactNode
}> = ({ locationHash, children }) => {
  return (
    <a
      href={locationHash}
      onClick={() => {
        const elm = document.getElementById(decodeURIComponent(locationHash))
        if (elm) {
          elm.scrollIntoView()
        }
      }}
    >
      {children}
    </a>
  )
}
