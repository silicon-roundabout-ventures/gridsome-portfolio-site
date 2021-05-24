// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// Currently using Contentful (headless CMS) to manage blog content
// See: https://gridsome.org/plugins/@gridsome/source-contentful

// Add Tailwindcsss to gridsome
const tailwindcss = require('tailwindcss')

module.exports = {
  // Website key setup parameters
  siteName: 'Silicon Roundabout Ventures Template',

  // Define templates
  templates: {
    ContentfulBlogPost: '/blog/:slug'
  },

  // Define/Setup Gridsome plugins used
  plugins: [
    // Contentful plugin
    {
      use: '@gridsome/source-contentful',
      options: {
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN,
        host: 'cdn.contentful.com',
        environment: process.env.CONTENTFUL_ENVIRONMENT,
        typename: 'Contentful'
      }
    }
  ],

  // Define CSS options
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss
        ]
      }
    }
  }
}
