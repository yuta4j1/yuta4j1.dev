import React from 'react'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'

export const Article: React.FC<{ title: string; mdText: string }> = ({
  title,
  mdText,
}) => {
  return (
    <article>
      <h1 className={classNames('font-bold', 'text-lg', 'py-2', 'px-6')}>
        {title}
      </h1>
      <div className={classNames('px-6', 'py-4')}>
        <ReactMarkdown
          children={mdText}
          remarkPlugins={[gfm]}
          components={{
            h2: ({ node, children, ...props }) => (
              <h2
                className={classNames(
                  'py-3',
                  'text-2xl',
                  'border-solid',
                  'border-b-2',
                  'border-gray-300'
                )}
              >
                {children}
              </h2>
            ),
            h3: ({ node, ...props }) => (
              <h3 className={classNames('py-3', 'text-xl')} {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className={classNames('py-2')} {...props} />
            ),
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={twilight}
                  language={match[1]}
                  children={String(children).replace(/\n$/, '')}
                />
              ) : (
                <code className={classNames('p-2')}>{children}</code>
              )
            },
          }}
        />
      </div>
    </article>
  )
}
