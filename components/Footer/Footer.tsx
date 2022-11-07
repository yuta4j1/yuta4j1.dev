import React from 'react'
import classNames from 'classnames'

/*
.footer {
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
}
*/

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
      ©️ 2022 yuta4j1. All rights reserved. This site was designed by yuta4j1.
    </footer>
  )
}
