import { GetStaticPropsContext } from 'next'
import { notFound } from 'next/navigation'
import classNames from 'classnames'
import Article from '../../../components/Article'
import { getAllPosts, getPostBySlug } from '../../../libs/api'
import type { Post } from '../../../interfaces/post'

export default async function PostEntry({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  if (!params) {
    notFound()
  }
  const { slug } = params
  const post = await getPostBySlug(slug, ['slug', 'title', 'content'])

  return (
    <div>
      <div className={classNames('h-10')}></div>
      <div className={classNames('flex', 'justify-center')}>
        <Article title={post.title} mdText={post.content} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts(['slug', 'content', 'title', 'date'])
  console.log('getPosts', posts)
  return posts.map(v => ({
    slug: v.slug,
  }))
}
