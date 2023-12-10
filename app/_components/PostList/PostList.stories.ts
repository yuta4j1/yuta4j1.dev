import type { Meta, StoryObj } from '@storybook/react'
import { PostList } from './PostList'
import type { Post } from '../../../interfaces/post'

const meta = {
  title: 'MyComponents/PostList',
  component: PostList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PostList>

export default meta
type Story = StoryObj<typeof meta>

const storyPosts: Post[] = Array(12)
  .fill(0)
  .map((_, i) => ({
    slug: 'article' + i,
    title: 'title' + i,
    content: 'AAA',
    tags: ['test', 'pagination'],
    date: '2023-12-20',
    emoji: 'memo',
  }))

export const PageablePostList: Story = {
  args: {
    posts: storyPosts,
  },
}
