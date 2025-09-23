module.exports = {
    siteUrl: process.env.SITE_URL || 'https://dallyvapes.co.ke',
    exclude: ['/server-sitemap.xml'],
    generateRobotsTxt: true,
    transform: async (config, path) => {
      return {
        loc: path.split('&').join('&amp;'), // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? []
      }
    }
  }
