import BlogClient from './BlogClient'

// For static export, we fetch data client-side to always get latest posts
// This allows new posts to appear without rebuilding
export default function BlogPage() {
  return <BlogClient />
}
