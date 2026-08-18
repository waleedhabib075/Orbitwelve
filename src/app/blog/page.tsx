import { pageMetadata } from "@/lib/seo";
import BlogClient from './BlogClient'

export const metadata = pageMetadata({
  title: "Blog | Orbitwelve",
  description:
    "Insights and practical guidance on digital strategy, development, marketing, and security from the Orbitwelve team.",
  path: "/blog",
});

// For static export, we fetch data client-side to always get latest posts
// This allows new posts to appear without rebuilding
export default function BlogPage() {
  return <BlogClient />
}
