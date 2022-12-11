const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  sentry: {
    hideSourceMaps: true,
  },
  images: {
    domains: ['media.graphassets.com', 'ipdata.co'],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    backendUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  swcMinify: true
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
