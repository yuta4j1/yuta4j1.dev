import React from 'react'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import Syntax from 'react-syntax-highlighter/dist/esm/prism'
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'

export const Article: React.FC<{ title: string; mdText: string }> = ({
  title,
  mdText,
}) => {
  return (
    <article
      className={classNames(
        'md:w-9/12',
        'lg:w-9/12',
        'xl:w-7/12',
        'mb-16',
        'leading-relaxed'
      )}
    >
      <div
        className={classNames('w-12', 'h-2', 'bg-blue-400', 'mx-6', 'mb-6')}
      ></div>
      <h1 className={classNames('font-bold', 'py-2', 'px-6', 'text-3xl')}>
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
                  'border-gray-300',
                  'mt-6',
                  'mb-2'
                )}
              >
                {children}
              </h2>
            ),
            h3: ({ node, ...props }) => (
              <h3
                className={classNames('pt-4', 'pb-1', 'text-xl', 'font-bold')}
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className={classNames('py-2')} {...props} />
            ),
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <Syntax
                  style={twilight}
                  language={match[1]}
                  children={String(children).replace(/\n$/, '')}
                />
              ) : (
                <code
                  className={classNames(
                    'px-2',
                    'py-1',
                    'text-sm',
                    'bg-gray-200',
                    'rounded'
                  )}
                >
                  {children}
                </code>
              )
            },
            table: ({ node, children, ...props }) => {
              return <table className={classNames('my-4')}>{children}</table>
            },
            th: ({ node, children, ...props }) => {
              return (
                <th
                  className={classNames(
                    'border-solid',
                    'p-2',
                    'border-gray-300'
                  )}
                  style={{
                    borderWidth: '1px',
                  }}
                >
                  {children}
                </th>
              )
            },
            td: ({ node, children, ...props }) => {
              return (
                <td
                  className={classNames(
                    'border-solid',
                    'p-2',
                    'border-gray-300'
                  )}
                  style={{
                    borderWidth: '1px',
                  }}
                >
                  {children}
                </td>
              )
            },
            ul: ({ node, children, ...props }) => {
              return (
                <ul className={classNames('my-2', 'list-disc', 'px-4')}>
                  {children}
                </ul>
              )
            },
            li: ({ node, children, ...props }) => {
              return <li>{children}</li>
            },
            a: ({ node, href, children, ...props }) => {
              return (
                <a
                  href={href}
                  className={classNames(
                    'text-blue-500',
                    'hover:text-blue-700',
                    'hover:underline'
                  )}
                >
                  {children}
                </a>
              )
            },
          }}
        />
      </div>
    </article>
  )
}
