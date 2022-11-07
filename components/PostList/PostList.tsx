import React from 'react'
import classNames from 'classnames'
import ArticleCard from '../ArticleCard'

type Post = {
  id: string
  title: string
  content: string
  tags: string[]
}

export const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={classNames('grid', 'gap-3')}>
      {posts.map(v => (
        <ArticleCard key={v.id} {...v} />
      ))}
    </div>
  )
}
