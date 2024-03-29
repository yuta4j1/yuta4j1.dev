import classNames from 'classnames'
import Link from 'next/link'
import { Tag } from './Tag'
import type { Post } from '../../../interfaces/post'
import nodeEmoji from 'node-emoji'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const mdContentOutset = (content: string): string => {
  return content.slice(0, 100) + '...'
}

type ArticleCardProps = Post

export const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  title,
  content,
  tags,
  date,
  emoji,
}) => {
  return (
    <article
      className={classNames(
        'px-4',
        'py-3',
        'border-solid',
        'border-1',
        'border-gray-200',
        'rounded-md'
      )}
    >
      <div className={classNames('flex')}>
        <Link href={`/post/${slug}`}>
          <div
            className={classNames(
              'bg-blue-100',
              'rounded-lg',
              'p-5',
              'md:p-7',
              'text-center'
            )}
          >
            <span className={classNames('text-3xl', 'md:text-5xl')}>
              {nodeEmoji.emojify(`:${emoji}:`)}
            </span>
          </div>
        </Link>
        <div className={classNames('flex', 'flex-col', 'ml-6', 'w-full')}>
          <div className={classNames('flex-grow')}>
            <p
              className={classNames(
                'font-semibold',
                'md:text-lg',
                notoSansJp.className
              )}
            >
              <Link href={`/post/${slug}`}>{title}</Link>
            </p>
            <p
              className={classNames(
                'py-2',
                'text-sm',
                'text-gray-600',
                'max-sm:hidden',
                'flex-grow'
              )}
            >
              {mdContentOutset(content)}
            </p>
          </div>

          <div className={classNames('flex', 'flex-shrink-0', 'flex-wrap')}>
            <div>{tags && tags.map((v, i) => <Tag key={i}>{v}</Tag>)}</div>
            <div className={classNames('ml-auto')}>
              <span className={classNames('text-gray-500', 'text-sm')}>
                {date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
