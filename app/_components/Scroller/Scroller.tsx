'use client'

import React, { useEffect } from 'react'

export const Scroller: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    if (location.hash !== '') {
      const elm = document.getElementById(decodeURIComponent(location.hash))
      if (elm) {
        elm.scrollIntoView()
      }
    }
  }, [])
  return <>{children}</>
}
