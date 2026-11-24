export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-08'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export const hasSanityConfig = Boolean(projectId && dataset)

// Helper function to validate env vars (call this when needed)
export function assertEnvVars() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
    return false
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.warn('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
    return false
  }

  return true
}
