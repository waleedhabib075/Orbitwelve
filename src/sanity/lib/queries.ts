import { groq } from 'next-sanity'
import { client } from './client'
import { hasSanityConfig } from '../env'

/**
 * Example GROQ queries for fetching Sanity data
 * Learn more about GROQ: https://www.sanity.io/docs/groq
 */

// Fetch all posts with pagination support
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "authorSlug": author->slug.current,
  "categories": categories[]->title,
  "excerpt": coalesce(pt::text(body)[0..155], "") + "..."
}`

// Fetch a single post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  "author": author->{
    _id,
    name,
    slug,
    image
  },
  "categories": categories[]->{
    _id,
    title,
    slug
  }
}`

// Fetch all post slugs (for static generation)
export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][] {
  "slug": slug.current
}`

// Fetch all authors
export const authorsQuery = groq`*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  bio
}`

// Fetch all categories
export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`

// Fetch posts by category
export const postsByCategoryQuery = groq`*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name
}`

// Fetch recent posts (limit)
export const recentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...$limit] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name
}`

/**
 * Helper functions to fetch data
 */

export async function getPosts() {
  if (!client || !hasSanityConfig) {
    return []
  }

  return await client.fetch(postsQuery)
}

export async function getPostBySlug(slug: string) {
  if (!client || !hasSanityConfig) {
    return null
  }

  return await client.fetch(postBySlugQuery, { slug })
}

export async function getPostSlugs() {
  if (!client || !hasSanityConfig) {
    return []
  }

  return await client.fetch(postSlugsQuery)
}

export async function getAuthors() {
  if (!client || !hasSanityConfig) {
    return []
  }

  return await client.fetch(authorsQuery)
}

export async function getCategories() {
  if (!client || !hasSanityConfig) {
    return []
  }

  return await client.fetch(categoriesQuery)
}

export async function getPostsByCategory(categoryId: string) {
  if (!client || !hasSanityConfig) {
    return []
  }

  return await client.fetch(postsByCategoryQuery, { categoryId })
}

export async function getRecentPosts(limit: number = 5) {
  if (!client || !hasSanityConfig) {
    return []
  }

  return await client.fetch(recentPostsQuery, { limit })
}

