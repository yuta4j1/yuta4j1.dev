import styles from '../styles/Home.module.css'
import PostList from '../components/PostList'
import { getAllPosts } from '../libs/api'
import type { Post } from '../interfaces/post'

async function getPosts(): Promise<Post[]> {
  const posts = await getAllPosts(['slug', 'content', 'title', 'date'])
  console.log('getPosts', posts)
  return posts
}

export default async function Home() {
  const recentPosts = await getPosts()
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PostList posts={recentPosts} />
      </main>
    </div>
  )
}
