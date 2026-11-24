'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { useEffect, useState } from 'react'

export default function StudioClient() {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Catch any runtime errors
    const handleError = (error: ErrorEvent) => {
      console.error('Studio error:', error)
      setHasError(true)
    }
    
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  // If there's an error, show a fallback message
  if (hasError) {
    return (
      <div style={{ 
        padding: '3rem 2rem', 
        fontFamily: 'system-ui', 
        maxWidth: '800px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1>Studio Loading Error</h1>
        <p>Sanity Studio requires server-side rendering. For production, please use the hosted Studio at <a href={`https://${config.projectId || 'your-project'}.sanity.studio`} target="_blank" rel="noopener noreferrer">sanity.studio</a></p>
      </div>
    )
  }

  try {
    return <NextStudio config={config} />
  } catch (error) {
    console.error('Studio render error:', error)
    return (
      <div style={{ 
        padding: '3rem 2rem', 
        fontFamily: 'system-ui', 
        maxWidth: '800px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1>Studio Unavailable</h1>
        <p>Sanity Studio requires server-side rendering. For production, please use the hosted Studio.</p>
      </div>
    )
  }
}

