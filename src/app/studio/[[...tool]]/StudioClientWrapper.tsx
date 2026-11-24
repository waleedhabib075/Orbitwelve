'use client'

import dynamic from 'next/dynamic'

// Dynamically import the client component with SSR disabled
// This must be in a Client Component, not a Server Component
const StudioClient = dynamic(() => import('./StudioClient'), { ssr: false })

export default function StudioClientWrapper() {
  return <StudioClient />
}

