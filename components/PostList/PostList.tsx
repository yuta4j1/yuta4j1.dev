import React from 'react'
import classNames from 'classnames'
import ArticleCard from '../ArticleCard'
import type { Post } from '../../interfaces/post'

export const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div
      className={classNames(
        'grid',
        'gap-6',
        'max-sm:mt-8',
        'max-sm:mb-16',
        'my-16',
        'w-full'
      )}
    >
      {posts.map(v => (
        <ArticleCard key={v.slug} {...v} />
      ))}
    </div>
  )
}
