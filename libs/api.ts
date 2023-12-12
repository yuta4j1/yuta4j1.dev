import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { Post } from '../interfaces/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      if (field === 'tags') {
        items[field] = data[field].split(',')
      } else {
        items[field] = data[field]
      }
    }
  })

  return items
}

const stringToDate = (src: string): Date => {
  return new Date(src.split('.').join('-'))
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => {
      const post1Date = stringToDate(post1.date)
      const post2Date = stringToDate(post2.date)
      return post1Date > post2Date ? -1 : 1
    })
  return posts as unknown as Post[]
}
