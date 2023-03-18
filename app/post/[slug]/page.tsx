import { notFound } from 'next/navigation'
import classNames from 'classnames'
import Article from '../../../components/Article'
import { getAllPosts, getPostBySlug } from '../../../libs/api'

export default async function PostEntry({
  params,
}: {
  params: { slug: string }
}) {
  if (!params) {
    notFound()
  }
  const { slug } = params
  const post = await getPostBySlug(slug, ['slug', 'title', 'content'])

  return (
    <main className={classNames('flex', 'justify-center', 'mt-10')}>
      <div
        className={classNames(
          'sm:w-11/12',
          'md:w-11/12',
          'lg:w-9/12',
          'xl:w-7/12',
          'w-11/12'
        )}
      >
        <Article title={post.title} mdText={post.content} />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts(['slug', 'content', 'title', 'date'])
  return posts.map(v => ({
    slug: v.slug,
  }))
}
