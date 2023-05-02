import classNames from 'classnames'
import PostList from './_components/PostList'
import { getAllPosts } from '../libs/api'
import type { Post } from '../interfaces/post'

async function getPosts(): Promise<Post[]> {
  const posts = await getAllPosts([
    'slug',
    'content',
    'title',
    'date',
    'emoji',
    'tags',
  ])
  return posts
}

export default async function Home() {
  const recentPosts = await getPosts()
  return (
    <div className={classNames('flex', 'justify-center', 'w-full')}>
      <main className={classNames('md:w-11/12', 'lg:w-9/12', 'xl:w-7/12')}>
        <PostList posts={recentPosts} />
      </main>
    </div>
  )
}
