'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import { urlFor } from '@/sanity/lib/image'
import { getPosts, getCategories } from '@/sanity/lib/queries'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  mainImage?: any
  author?: string
  authorSlug?: string
  categories?: string[]
  excerpt?: string
}

type Category = {
  _id: string
  title: string
  slug: { current: string }
}

const POSTS_PER_PAGE = 9

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Fetch posts and categories on client side
  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts().catch(() => []),
          getCategories().catch(() => [])
        ])
        setPosts(postsData as Post[])
        setCategories(categoriesData as Category[])
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') {
      return posts
    }
    return posts.filter(post => 
      post.categories?.some(cat => cat.toLowerCase() === activeCategory.toLowerCase())
    )
  }, [posts, activeCategory])

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Get unique categories from posts
  const postCategories = useMemo(() => {
    const cats = new Set<string>()
    posts.forEach(post => {
      post.categories?.forEach(cat => cats.add(cat))
    })
    return Array.from(cats)
  }, [posts])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our
              <span className="bg-gradient-to-r from-[#1098D5] to-[#1098D5] bg-clip-text text-transparent">
                {' '}Blog
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Insights, stories and case studies about technology and design
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-[#1098D5] rounded-full animate-pulse" />
                <span className="text-sm font-medium">
                  Latest updates &amp; thinking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-8">
              Latest Articles
              <div className="mt-2 h-1 w-20 bg-[#1098D5] mx-auto"></div>
            </h2>

            {/* Category Filters */}
            {postCategories.length > 0 && (
              <div className="text-center mb-8">
                <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveCategory('all')
                      setCurrentPage(1)
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      activeCategory === 'all'
                        ? 'bg-[#1098D5] text-white border-[#1098D5] shadow-sm'
                        : 'bg-transparent text-gray-700 border-gray-300 hover:bg-[#1098D5]/10'
                    }`}
                  >
                    All
                  </button>
                  {postCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category)
                        setCurrentPage(1)
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        activeCategory === category
                          ? 'bg-[#1098D5] text-white border-[#1098D5] shadow-sm'
                          : 'bg-transparent text-gray-700 border-gray-300 hover:bg-[#1098D5]/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading posts...</p>
              </div>
            ) : paginatedPosts.length > 0 ? (
              /* Blog Grid - 3 columns, 9 posts per page */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {paginatedPosts.map((post) => (
                  <article
                    key={post._id}
                    className="rounded-xl hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden bg-white flex flex-col"
                  >
                    {post.mainImage && (
                      <div className="relative w-full h-48">
                        <Image
                          src={urlFor(post.mainImage).width(600).height(300).url()}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <h4
                        className="text-lg font-semibold mb-2 text-gray-900"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.title}
                      </h4>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.categories.slice(0, 2).map((category) => (
                            <span
                              key={category}
                              className="inline-block px-2 py-0.5 text-xs font-medium bg-[#eef6fb] text-[#0b6b9a] rounded-md"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        {post.author && <span>{post.author}</span>}
                        {post.author && post.publishedAt && <span>•</span>}
                        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                      </div>
                      {post.excerpt && (
                        <p className="text-gray-700 text-sm mb-3 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="text-[#1098D5] hover:underline font-medium mt-auto text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts found.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1098D5] text-white hover:bg-[#0d7fb0]'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg font-medium transition ${
                        currentPage === page
                          ? 'bg-[#1098D5] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1098D5] text-white hover:bg-[#0d7fb0]'
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* Show current page info */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-4 text-sm text-gray-500">
                Showing {((currentPage - 1) * POSTS_PER_PAGE) + 1} to{' '}
                {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of{' '}
                {filteredPosts.length} posts
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

