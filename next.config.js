module.exports = {
  swcMinify: true,
  images: {
      domains: ['storage.googleapis.com', 'ik.imagekit.io', 'res.cloudinary.com']
    },
    experimental: {
      scrollRestoration: true,
    },
    // experimental: {
    //   concurrentFeatures: true,
    //   runtime: 'nodejs',
    //   serverComponents: true,
    // },
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true
    },
}