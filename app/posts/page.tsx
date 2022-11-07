import styles from '../styles/Home.module.css'
import PostList from '../components/PostList'
import { getAllPosts } from '../libs/api'

type Post = {
  id: string
  title: string
  content: string
  tags: string[]
}

async function getPosts(): Promise<Post[]> {
  const posts = await getAllPosts(['slug', 'content', 'title', 'date'])
  console.log('getPosts', posts)
  return posts
}

export default function Post() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PostList posts={recentPosts} />
      </main>
    </div>
  )
}
