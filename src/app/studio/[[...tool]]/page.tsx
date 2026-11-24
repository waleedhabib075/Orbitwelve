/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 *
 * IMPORTANT: Sanity Studio requires server-side rendering and will NOT work with static export.
 * This page is configured for static export compatibility.
 * Studio is only available in development mode (npm run dev).
 * For production Studio access, either:
 * 1. Remove "output: export" from next.config.ts (requires server hosting)
 * 2. Host Studio separately (e.g., on Vercel with serverless functions)
 *
 * Architecture:
 * - This is a Server Component (for routing, metadata, generateStaticParams)
 * - StudioClientWrapper is a Client Component (handles dynamic import with ssr: false)
 * - StudioClient is the actual Sanity Studio component
 */

import StudioClientWrapper from './StudioClientWrapper'

// Required for static export mode (output: "export")
export async function generateStaticParams() {
  // For optional catch-all route [[...tool]], we need to return params with the tool property
  // Return base path /studio (empty array) and common studio routes
  // Note: tool: [] means the base /studio path (no sub-path)
  return [
    { tool: [] }, // Base /studio path - this creates /studio/index.html
    { tool: ['desk'] }, // Common Sanity Studio route
  ]
}

// Metadata for static export compatibility
export const metadata = {
  title: 'Sanity Studio',
  description: 'Content management with Sanity Studio',
}

export default function StudioPage() {
  // Always render the Studio - it will work in development
  // In production/static export, it may have limited functionality but won't error
  return <StudioClientWrapper />
}
