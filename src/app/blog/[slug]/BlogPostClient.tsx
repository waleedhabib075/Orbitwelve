'use client'

import { getPostBySlug } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  mainImage?: any
  author?: string | { name: string; _id: string; slug: { current: string }; image?: any }
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>
  body?: any
}

type BlogPostClientProps = {
  slug: string
  initialPost?: Post | null
}

// Portable Text components for rendering Sanity content
// Enhanced with error handling to prevent crashes from HTML content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      try {
        if (!value?.asset) return null
        const imageUrl = urlFor(value).width(1200).url()
        if (!imageUrl) return null
        return (
          <div className="my-8">
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog image'}
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )
      } catch (error) {
        console.error('Error rendering image:', error)
        return null
      }
    },
    // Handle code blocks if they exist
    code: ({ value }: any) => {
      try {
        return (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">{value?.code || ''}</code>
          </pre>
        )
      } catch (error) {
        console.error('Error rendering code:', error)
        return null
      }
    },
  },
  block: {
    h1: ({ children }: any) => {
      try {
        return <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
      } catch (error) {
        console.error('Error rendering h1:', error)
        return <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">Heading</h1>
      }
    },
    h2: ({ children }: any) => {
      try {
        return <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
      } catch (error) {
        console.error('Error rendering h2:', error)
        return <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Subheading</h2>
      }
    },
    h3: ({ children }: any) => {
      try {
        return <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
      } catch (error) {
        console.error('Error rendering h3:', error)
        return <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Subheading</h3>
      }
    },
    h4: ({ children }: any) => {
      try {
        return <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">{children}</h4>
      } catch (error) {
        console.error('Error rendering h4:', error)
        return <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">Subheading</h4>
      }
    },
    blockquote: ({ children }: any) => {
      try {
        return (
          <blockquote className="my-6 p-6 bg-gray-100 border border-gray-200 rounded-lg italic text-gray-700 leading-relaxed">
            {children}
          </blockquote>
        )
      } catch (error) {
        console.error('Error rendering blockquote:', error)
        return null
      }
    },
    normal: ({ children }: any) => {
      try {
        // Handle empty or invalid content
        if (!children || (Array.isArray(children) && children.length === 0)) {
          return null
        }
        return (
          <p className="text-gray-800 leading-relaxed mb-4 text-base" style={{ fontFamily: 'serif' }}>
            {children}
          </p>
        )
      } catch (error) {
        console.error('Error rendering paragraph:', error)
        return null
      }
    },
  },
  list: {
    bullet: ({ children }: any) => {
      try {
        if (!children || (Array.isArray(children) && children.length === 0)) return null
        return <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800 ml-4">{children}</ul>
      } catch (error) {
        console.error('Error rendering bullet list:', error)
        return null
      }
    },
    number: ({ children }: any) => {
      try {
        if (!children || (Array.isArray(children) && children.length === 0)) return null
        return <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-800 ml-4">{children}</ol>
      } catch (error) {
        console.error('Error rendering numbered list:', error)
        return null
      }
    },
  },
  marks: {
    strong: ({ children }: any) => {
      try {
        return <strong className="font-bold">{children}</strong>
      } catch (error) {
        console.error('Error rendering strong:', error)
        return <strong>{children}</strong>
      }
    },
    em: ({ children }: any) => {
      try {
        return <em className="italic">{children}</em>
      } catch (error) {
        console.error('Error rendering emphasis:', error)
        return <em>{children}</em>
      }
    },
    link: ({ value, children }: any) => {
      try {
        if (!value?.href) return <span>{children}</span>
        const href = value.href
        const target = href.startsWith('http') ? '_blank' : undefined
        return (
          <a
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-[#1098D5] hover:underline"
          >
            {children}
          </a>
        )
      } catch (error) {
        console.error('Error rendering link:', error)
        return <span>{children}</span>
      }
    },
    // Handle code marks
    code: ({ children }: any) => {
      try {
        return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
      } catch (error) {
        console.error('Error rendering inline code:', error)
        return <code>{children}</code>
      }
    },
  },
  // Handle unknown types gracefully
  unknownType: ({ value, isInline }: any) => {
    console.warn('Unknown Portable Text type:', value?._type)
    return isInline ? <span>Unknown content</span> : <div>Unknown content</div>
  },
  // Handle unknown marks gracefully
  unknownMark: ({ value, children }: any) => {
    console.warn('Unknown Portable Text mark:', value?.markType)
    return <span>{children}</span>
  },
}

export default function BlogPostClient({ slug, initialPost }: BlogPostClientProps) {
  const [post, setPost] = useState<Post | null>(initialPost || null)
  const [loading, setLoading] = useState(!initialPost)
  const [error, setError] = useState<string | null>(null)

  // Fetch post on client side if not provided initially
  useEffect(() => {
    if (!initialPost) {
      async function fetchPost() {
        try {
          setLoading(true)
          const postData = await getPostBySlug(slug)
          setPost(postData as Post)
        } catch (err) {
          console.error('Error fetching post:', err)
          setError('Failed to load post')
        } finally {
          setLoading(false)
        }
      }
      fetchPost()
    }
  }, [slug, initialPost])

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading post...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-500 mb-6">{error || 'The post you are looking for does not exist.'}</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#1098D5] hover:underline"
            >
              <span>←</span>
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Single column centered layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <article className="bg-white">
          {/* Category Tags */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id || category.title}
                  className="inline-block px-4 py-1.5 bg-[#1098D5] text-white text-sm font-semibold rounded-lg"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <User size={16} className="text-gray-400" />
            {post.author && (
              <>
                <span>{typeof post.author === 'string' ? post.author : post.author.name}</span>
                {post.publishedAt && <span>•</span>}
              </>
            )}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </div>

          {/* Hero Image */}
          {post.mainImage && (
            <div className="mb-8">
              <Image
                src={urlFor(post.mainImage).width(1200).height(520).url()}
                alt={post.mainImage.alt || post.title}
                width={1200}
                height={520}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {post.body ? (
              <PortableText 
                value={post.body} 
                components={portableTextComponents}
                onMissingComponent={(message, info) => {
                  // Log missing components but don't crash
                  console.warn('PortableText missing component:', message, info)
                  return null
                }}
              />
            ) : (
              <p className="text-gray-500 italic">No content available.</p>
            )}
          </div>
        </article>

        {/* Back to Blog Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1098D5] transition-colors"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

