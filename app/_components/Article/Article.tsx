import Image from 'next/image'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import Syntax from 'react-syntax-highlighter/dist/esm/prism'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'
import * as cheerio from 'cheerio'
import { PreviewCard } from './PreviewCard'
import { Noto_Sans_JP } from 'next/font/google'
import Scroller from '../Scroller'

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

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

const hostnameFromUrl = (urlStr: string): string => {
  const url = new URL(urlStr)
  return url.host
}
const originFromUrl = (urlStr: string): string => {
  const url = new URL(urlStr)
  return url.origin
}

// リンクプレビューカードを作成するためのデータ取得
async function ogFetch(links: string[] | null): Promise<CardLinkInfos | null> {
  if (!links) return null
  const fetchAll = links.map(
    link =>
      new Promise<CardLinkInfos | null>(resolve => {
        fetch(link)
          .then(res => res.text())
          .then(text => {
            let title = ''
            let description = ''
            let imageUrl = ''
            const $ = cheerio.load(text)
            const ogImage = $('meta[property="og:image"]').attr('content')
            if (ogImage) {
              imageUrl = ogImage
            } else {
              imageUrl =
                $('meta[property="twitter:image"]').attr('content') ?? ''
            }
            const ogTitle = $('meta[property="og:title"]').attr('content')
            if (ogTitle) {
              title = ogTitle
            } else {
              const twitterTitle = $('meta[property="twitter:title"]').attr(
                'content'
              )
              if (twitterTitle) {
                title = twitterTitle
              } else {
                title = $('title').text() ?? ''
              }
            }
            const ogDescription = $('meta[property="og:description"]').attr(
              'content'
            )
            if (ogDescription) {
              description = ogDescription
            } else {
              description =
                $('meta[property="description"]').attr('content') ?? ''
            }
            const faviconUrl = `${originFromUrl(link)}/favicon.ico`
            resolve({
              [link]: {
                title,
                imageUrl,
                hostname: hostnameFromUrl(link),
                description,
                faviconUrl,
              },
            })
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

export const Article: React.FC<{
  title: string
  mdText: string
  cardLinkInfos: CardLinkInfos | null
}> = ({ title, mdText, cardLinkInfos }) => {
  return (
    <Scroller>
      <article className={classNames('mb-16', 'leading-loose')}>
        <div
          className={classNames('w-12', 'h-2', 'bg-blue-400', 'mx-6', 'mb-6')}
        ></div>
        <h1
          className={classNames(
            'font-bold',
            'py-2',
            'px-6',
            'text-3xl',
            notoSansJp.className
          )}
        >
          {title}
        </h1>
        <div className={classNames('px-6', 'py-4')}>
          <ReactMarkdown
            // eslint-disable-next-line
            children={mdText}
            remarkPlugins={[gfm]}
            components={{
              h2: ({ node, children, ...props }) => {
                const innerTextNode = children as React.ReactNode
                const locationHash = `#${innerTextNode?.toString() ?? ''}`
                return (
                  <h2
                    className={classNames(
                      'py-3',
                      'text-2xl',
                      'border-solid',
                      'border-b',
                      'border-gray-300',
                      'mt-10',
                      'mb-4',
                      'relative',
                      'font-bold',
                      'hover:before:content-["#"]',
                      'hover:before:absolute',
                      'hover:before:-left-5',
                      'hover:before:text-gray-500',
                      notoSansJp.className
                    )}
                    id={locationHash}
                  >
                    <a href={locationHash}>{children}</a>
                  </h2>
                )
              },
              h3: ({ node, ...props }) => (
                <h3
                  className={classNames(
                    'pt-4',
                    'pb-1',
                    'text-xl',
                    'font-bold',
                    notoSansJp.className
                  )}
                  {...props}
                />
              ),
              p: ({ node, children, ...props }) => {
                /**
                 * 独立した行リンクのパースの場合、リンクプレビューカードへの変換を行うが、
                 * 先にpタグ判定され、pタグの下にリンクプレビューカードのdiv要素が来てしまうこととなり、
                 * これが適切なマークアップでないためハイドレーションエラーが発生する。
                 *
                 * このため、独立した行リンクを判定した場合のみ、pタグではなくdivタグへの変換を行う
                 */
                if ((children[0] as any)?.props?.href) {
                  return (
                    <div className={classNames('my-6')} {...props}>
                      {children}
                    </div>
                  )
                }
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
                    return <PreviewCard href={href} ogInfo={ogInfo} />
                  }
                }
                return (
                  <a
                    href={href}
                    className={classNames(
                      'text-blue-600',
                      'hover:text-blue-700',
                      'hover:underline'
                    )}
                  >
                    <span className={classNames('break-words')}>
                      {children}
                    </span>
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
    </Scroller>
  )
}

export async function ArticleContainer({
  title,
  mdText,
}: {
  title: string
  mdText: string
}) {
  const ogTargetLinks = extractLinks(mdText)
  // 独立したリンクの情報マップ
  const cardLinkInfos = await ogFetch(ogTargetLinks)

  return <Article title={title} mdText={mdText} cardLinkInfos={cardLinkInfos} />
}
