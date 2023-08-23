import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import classNames from 'classnames'
import Article from '../../_components/Article'
import { getAllPosts, getPostBySlug } from '../../../libs/api'

type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  const post = await getPostBySlug(slug, ['title'])

  return {
    title: `${post.title} | yuta4j1.dev`,
    description: 'yuta4j1 develop blog',
  }
}

export default async function PostEntry({ params }: PageProps) {
  if (!params) {
    notFound()
  }
  const { slug } = params
  const post = await getPostBySlug(slug, ['slug', 'title', 'content'])

  return (
    <main className={classNames('flex', 'justify-center', 'mt-10', 'grow')}>
      <div
        className={classNames(
          'sm:w-11/12',
          'md:w-11/12',
          'lg:w-9/12',
          'xl:w-7/12',
          'w-full'
        )}
      >
        {/* @ts-ignore Server Component */}
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
