import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import Syntax from 'react-syntax-highlighter/dist/esm/prism'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'

export const Article: React.FC<{ title: string; mdText: string }> = ({
  title,
  mdText,
}) => {
  return (
    <article className={classNames('mb-16', 'leading-relaxed')}>
      <div
        className={classNames('w-12', 'h-2', 'bg-blue-400', 'mx-6', 'mb-6')}
      ></div>
      <h1 className={classNames('font-bold', 'py-2', 'px-6', 'text-3xl')}>
        {title}
      </h1>
      <div className={classNames('px-6', 'py-4')}>
        <ReactMarkdown
          // eslint-disable-next-line
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
                  'mt-10',
                  'mb-4'
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
            code: ({ node, inline, className, children }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <Syntax
                  style={oneDark}
                  language={match[1]}
                  // eslint-disable-next-line
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
            table: ({ children }) => {
              return <table className={classNames('my-4')}>{children}</table>
            },
            th: ({ children }) => {
              return (
                <th
                  className={classNames(
                    'border-solid',
                    'p-2',
                    'border-gray-300',
                    'bg-gray-100'
                  )}
                  style={{
                    borderWidth: '1px',
                  }}
                >
                  {children}
                </th>
              )
            },
            td: ({ children }) => {
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
            ol: ({ children }) => {
              return (
                <ul className={classNames('my-2', 'px-4', 'list-decimal')}>
                  {children}
                </ul>
              )
            },
            ul: ({ children }) => {
              return (
                <ul className={classNames('my-2', 'px-4', 'list-disc')}>
                  {children}
                </ul>
              )
            },
            li: ({ children }) => {
              return <li className={classNames('my-2')}>{children}</li>
            },
            a: ({ href, children }) => {
              return (
                <a
                  href={href}
                  className={classNames(
                    'text-blue-500',
                    'hover:text-blue-700',
                    'hover:underline'
                  )}
                >
                  <span className={classNames('break-words')}>{children}</span>
                </a>
              )
            },
            blockquote: ({ children }) => {
              return (
                <blockquote
                  className={classNames(
                    'py-2',
                    'px-4',
                    'my-2',
                    'text-gray-500',
                    'border-solid',
                    'border-l-2',
                    'border-gray-400'
                  )}
                >
                  {children}
                </blockquote>
              )
            },
            img: ({ src, alt }) => {
              if (src && alt) {
                return (
                  <div style={{ position: 'relative', height: 400 }}>
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )
              }
              return <></>
            },
          }}
        />
      </div>
    </article>
  )
}
