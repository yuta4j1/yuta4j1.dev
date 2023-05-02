import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import Syntax from 'react-syntax-highlighter/dist/esm/prism'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'
import * as cheerio from 'cheerio'
import { join } from 'node:path'

type CardLink = {
  title: string
  hostname: string
  imageUrl: string
  description: string
  faviconUrl: string
}

type CardLinkInfos = { [href: string]: CardLink }

const extractLinks = (mdText: string): string[] | null => {
  const UrlRegexp = /^(https?:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+)/gm
  return mdText.match(UrlRegexp)
}

const hostnaemFromUrl = (urlStr: string): string => {
  const url = new URL(urlStr)
  return url.host
}
const originFromUrl = (urlStr: string): string => {
  const url = new URL(urlStr)
  return url.origin
}

async function ogFetch(links: string[] | null): Promise<CardLinkInfos | null> {
  if (!links) return null
  const fetchAll = links.map(
    link =>
      new Promise<CardLinkInfos | null>(resolve => {
        fetch(link)
          .then(res => res.text())
          .then(text => {
            const $ = cheerio.load(text)
            const ogImage = $('meta[property="og:image"]').attr('content')
            const ogUrl = $('meta[property="og:url"]').attr('content')
            const ogTitle = $('meta[property="og:title"]').attr('content')
            const ogDescription = $('meta[property="og:description"]').attr(
              'content'
            )
            if (ogImage && ogTitle && ogUrl) {
              resolve({
                [link]: {
                  title: ogTitle,
                  imageUrl: ogImage,
                  hostname: ogUrl ? hostnaemFromUrl(ogUrl) : '',
                  description: ogDescription ?? '',
                  faviconUrl: ogUrl
                    ? join(originFromUrl(ogUrl), 'favicon.ico')
                    : '',
                },
              })
            }
          })
          .catch(err => {
            console.error(err)
            resolve(null)
          })
      })
  )
  const linkCards = await Promise.all(fetchAll)
  let res: CardLinkInfos = {}
  for (const l of linkCards) {
    res = { ...res, ...l }
  }
  return res
}

export async function Article({
  title,
  mdText,
}: {
  title: string
  mdText: string
}) {
  const ogTargetLinks = extractLinks(mdText)
  const cardLinkInfos = await ogFetch(ogTargetLinks)

  return (
    <article className={classNames('mb-16', 'leading-loose')}>
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
            p: ({ node, children, ...props }) => {
              return (
                <p className={classNames('py-2')} {...props}>
                  {children}
                </p>
              )
            },
            code: ({ node, inline, className, children }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <Syntax
                  style={oneDark}
                  language={match[1]}
                  // eslint-disable-next-line
                  children={String(children).replace(/\n$/, '')}
                />
              ) : inline ? (
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
              ) : (
                <pre
                  className={classNames(
                    'px-4',
                    'py-4',
                    'text-sm',
                    'bg-gray-200',
                    'rounded',
                    'whitespace-pre-wrap'
                  )}
                >
                  <code>{children}</code>
                </pre>
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
              if (cardLinkInfos) {
                const ogInfo = cardLinkInfos[href ?? '']
                if (ogInfo) {
                  return (
                    <div
                      className={classNames(
                        'rounded-md',
                        'border-[1px]',
                        'h-[130px]'
                      )}
                    >
                      <a className={classNames('flex', 'h-full')} href={href}>
                        <div
                          className={classNames('p-4', 'h-full', 'w-[530px]')}
                        >
                          <h1 className={classNames('truncate')}>
                            {ogInfo.title}
                          </h1>
                          <div
                            className={classNames(
                              'text-sm',
                              'text-gray-500',
                              'mt-2',
                              'truncate'
                            )}
                          >
                            {ogInfo.description}
                          </div>
                          <div className={classNames('flex')}>
                            <div
                              className={classNames(
                                'text-xs',
                                'text-gray-600',
                                'mt-2'
                              )}
                            >
                              {ogInfo.hostname}
                            </div>
                          </div>
                        </div>
                        <img
                          className={classNames('ml-auto')}
                          src={ogInfo.imageUrl}
                          alt="site preview image"
                          height={100}
                        />
                      </a>
                    </div>
                  )
                }
              }
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
