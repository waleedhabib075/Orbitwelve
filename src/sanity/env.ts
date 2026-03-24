export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-08'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

// Helper function to validate env vars (call this when needed)
export function assertEnvVars() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
  }
}
