import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { Tag } from './Tag'
import type { Post } from '../../interfaces/post'

const mdContentOutset = (content: string): string => {
  // return removeMd(content).slice(0, 150) + '...'
  return content.slice(0, 150) + '...'
}

type ArticleCardProps = Post

// fontSize={20} fontWeight={'bold'}
export const ArticleCard: React.FC<ArticleCardProps> = ({
  slug,
  title,
  content,
  tags,
}) => {
  return (
    <div className={classNames('flex', 'justify-center')}>
      <div
        className={classNames(
          'w-3/5',
          'px-4',
          'py-3',
          'border-solid',
          'border-2',
          'border-gray-200',
          'rounded-md'
        )}
      >
        <p className={classNames('font-semibold', 'text-lg')}>
          <Link href={`/post/${slug}`}>{title}</Link>
        </p>
        <p className={classNames('py-2')}>{mdContentOutset(content)}</p>
        {tags && tags.map((v, i) => <Tag key={i}>{v}</Tag>)}
      </div>
    </div>
  )
}
