import type { Meta, StoryObj } from '@storybook/react'
import { ArticleCard } from './ArticleCard'

const meta = {
  title: 'MyComponents/ArticleCard',
  component: ArticleCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof ArticleCard>

export default meta
type Story = StoryObj<typeof meta>

export const SampleArticleCard: Story = {
  args: {
    slug: 'various_file_upload',
    title: '様々なファイルアップロード手法',
    content:
      'テストテストテストテストテストテストテストテストテストテストテストテスト',
    tags: ['file', 'test'],
    date: '2023-12-11',
    emoji: 'thinking_face',
  },
}
