import type { FC } from 'react'
import classNames from 'classnames'
import ArticleCard from '../ArticleCard'
import Pagination from '../Pagination'
import type { Post } from '../../../interfaces/post'

const PER_PAGE_POST_NUM = 10

export const PostList: FC<{ posts: Post[] }> = ({ posts }) => {
  const showPagination = posts.length > PER_PAGE_POST_NUM
  const lastPageIndex = (): number => {
    if (!showPagination) {
      return 0
    }
    let pageNum = Math.round(posts.length / PER_PAGE_POST_NUM)
    const surplus = posts.length % PER_PAGE_POST_NUM
    if (surplus > 0) {
      return pageNum + 1
    }
    return pageNum
  }
  return (
    <div>
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
      {showPagination && (
        <Pagination currentPageIndex={1} lastPageIndex={lastPageIndex()} />
      )}
    </div>
  )
}
