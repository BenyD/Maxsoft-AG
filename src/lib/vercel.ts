// Vercel Analytics and Speed Insights Configuration
export const vercelConfig = {
  // Analytics configuration
  analytics: {
    // Enable analytics in production
    enabled: process.env.NODE_ENV === 'production',
    // Custom event tracking can be added here
  },
  // Speed Insights configuration
  speedInsights: {
    // Enable speed insights in production
    enabled: process.env.NODE_ENV === 'production',
  },
}

// Helper function to check if Vercel features should be enabled
export const shouldEnableVercelFeatures = () => {
  return process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
}
