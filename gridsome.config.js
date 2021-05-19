// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// Currently using Contentful (headless CMS) to manage blog content
// See: https://gridsome.org/plugins/@gridsome/source-contentful


//Add Tailwindcsss to gridsome
const tailwindcss = require("tailwindcss")

module.exports = {
  siteName: 'Silicon Roundabout Ventures',
  templates: {
   ContentfulBlogPost: '/blog/:slug'
  },
  plugins: [
    {
    use: "@gridsome/source-contentful",
      options: {
      space: process.env.CONTENTFUL_SPACE,
      accessToken: process.env.CONTENTFUL_TOKEN,
      host: "cdn.contentful.com",
      environment: process.env.CONTENTFUL_ENVIRONMENT,
      typename: "Contentful"
    }
}
],
 css: {
  loaderOptions: {
    postcss: {
      plugins: [
        tailwindcss
      ],
    },
  },
 }
}
