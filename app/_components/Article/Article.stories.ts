import type { Meta, StoryObj } from '@storybook/react'
import { Article } from './Article'

const meta = {
  title: 'MyComponents/Article',
  component: Article,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: '',
  },
} satisfies Meta<typeof Article>

export default meta
type Story = StoryObj<typeof meta>

export const ArticlePreviewCardImage: Story = {
  args: {
    title: 'テストTitle',
    mdText: `## プレビューリンクカードの確認

https://zenn.dev/mssknd/articles/1046a44b9d9502
`,
    cardLinkInfos: {
      'https://zenn.dev/mssknd/articles/1046a44b9d9502': {
        title: 'render hooks パターンの素振り',
        imageUrl:
          'https://res.cloudinary.com/zenn/image/upload/s--q9aAE705--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:render%2520hooks%2520%25E3%2583%2591%25E3%2582%25BF%25E3%2583%25BC%25E3%2583%25B3%25E3%2581%25AE%25E7%25B4%25A0%25E6%258C%25AF%25E3%2582%258A%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:Masashi%2520Kondo%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyLzViNDUwZjZjZjYuanBlZw==%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png',
        hostname: 'zenn.dev',
        description: '',
        faviconUrl: 'https://zenn.dev/favicon.ico',
      },
    },
  },
}
