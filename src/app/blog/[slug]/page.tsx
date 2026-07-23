import { getPostBySlug, getPostSlugs } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { hasSanityConfig } from '@/sanity/env'
import type { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

type Props = {
  params: Promise<{ slug: string }>
}

// Generate static params for posts that exist at build time
export async function generateStaticParams() {
  if (!hasSanityConfig) {
    return []
  }

  const slugs = await getPostSlugs().catch(() => [])
  return slugs.map((post: { slug: string }) => ({ slug: post.slug }))
}

// Generate metadata for SEO (optional - will work even if post not found)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!hasSanityConfig) {
    return {
      title: 'Post',
      description: 'Blog post',
    }
  }

  try {
    const post = await getPostBySlug(slug).catch(() => null)
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The post you are looking for does not exist.',
      }
    }

    const excerpt = post.body ? String(post.body).substring(0, 155) + '...' : ''

    return {
      title: post.title,
      description: excerpt,
      openGraph: {
        title: post.title,
        description: excerpt,
        images: post.mainImage ? [urlFor(post.mainImage).width(1200).url()] : undefined,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: excerpt,
        images: post.mainImage ? [urlFor(post.mainImage).width(1200).url()] : undefined,
      },
    }
  } catch {
    return {
      title: 'Post',
      description: 'Blog post',
    }
  }
}

// Server component that tries to fetch post at build time, but falls back to client-side
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  // Try to fetch post at build time (for static generation)
  // If it fails or post doesn't exist, client component will fetch it
  const initialPost = hasSanityConfig
    ? await getPostBySlug(slug).catch(() => null)
    : null

  return <BlogPostClient slug={slug} initialPost={initialPost} />
}
