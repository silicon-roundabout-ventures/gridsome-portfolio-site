# Gridsome Portfolio JAMstack website with TailwindCSS and Conentful CMS
## *by Silicon Roundabout Ventures*

## Project Overview

Template containig a baic girdsome project for a portfolio website (e.g. for a VC or PE firm)

## Installation Instructions
1. You should have Node and NPM (or Yarn) installed on your machine:
  * On Linux, you can probably do it via `sudo apt get node` (double check for your distro)
  * On a Mac, you're better off going via Homebrew (see how to install/update it [here](https://brew.sh/) if you don't have it or it's out of date): `brew install node`
2. `npm install --global @gridsome/cli` (you might have to give it root access by prepending `sudo`)
3. If you use `npm`, install the packages with `npm install` (with Yarn it's `yarn install`)
4. Register and Create a space on Contentful
5. Create a `.env` file to store your own API keys from Contentful (`Settings >> API Keys`) *(If you're not sure how to do this, see how I did it in the development log below)*
6. Run `gridsome develop` to run your local server
7. Your site should be live at http://localhost:8080)


## Stack used
 * Node
 * Gridsome (based on Vue)
 * GraphQL (via Gridsome)
 * TailwindCSS
 * Contentful

### Gridsome infrastructure
The packages used in the project are stored in `package.json` automatically. The settings for the project are set in `gridsome.config.js`. `.vue` components go in the `src` directory and create page routes `src/pages`, page templates `src/templates`, page components `components`, or layouts (think Header/Footer) `layouts`. `gridsome build` generates static files in a `/dist` folder. It's also best practice to store other assets in `src` such as any CSS files (e.g. in a custom `src/assets/css`). [Here](https://gridsome.org/docs/core-concepts/) you can find the key concepts behind the gridsome architecture.


### Tools used

* text editor (Atom in my case with a few useful [JS plugins](https://www.voidcanvas.com/12-must-have-atom-extensions-to-work-in-javascript/))
* terminal
* npm
  * Markdown package

### Dev Log

### Summary

1. Created a new girdsome project
2. Signed up and created a Contentful account and blog
3. Configured our Contentful connection to our website
4. Added TailwindCSS to the website (and addressed potential compatibility issues)
5. Added markdown-it so our website can read the markdown that Contentful sends it
6. Created a Blog.vue page to view a list of all blogs
7. Created a ContentfulBlogPost.vue template to see the individual blog posts


#### 1. Project setup:
  1. Installed the gridsome command line toolkit via `sudo npm install --global @gridsome/cli`
  2. Gridsome [project infrastructure](https://gridsome.org/docs/#how-to-install) created with `gridsome create gridsome-portfolio-site`, entered via `cd gridsome-portfolio-site`, and linked to github repo:
    1. `git init`
    2. `git remote add origin <Remote repository URL>`
    3. `git add .`
    4. `git commit -am "Gridsome setup"`
    5. `git pull origin main --allow-unrelated-histories`
    6. Conflicts merged appropriately
    7. `git push <remote> <branch>`
    * *Note: I made my life more difficult by wanting to merge an existing repo with basic files in it ─I could have just made the repo locally and pushed it fresh to Github. It was totally useless to do what I did ;p*
  3. Gridsome local server started: `gridsome develop` (now I can check the site out on http://localhost:8080)
  4. Followed the [Create Page section here](https://stuffwelearned.com/blog/building-your-website-with-gridsome-a-complete-guide/#creating-pages) to set up and play around with the basic Gridsome framework

#### 2. Contentful setup and integration:
  1. Headed over to [Contentful](https://www.contentful.com), created a free account, and create a new space. You can create a new blank space, or use the "Blog" example space. For ease of use, I'll be choosing the blog example space. Spaces are where the Contentful webapp stores content. They are available at [app.contentful.com](https://app.contentful.com/)
  2. Install the [Contenful Gridsome plugin](https://gridsome.org/plugins/@gridsome/source-contentful): `npm add @gridsome/source-contentful`
  3. In the root of the project, I added a file called `.env` to locally store the Contentful environmental variables that are unique to my space. To find these, I logged into Contentful and under `Settings >> API Keys` I could generate the environmental keys "Space ID", "Access Token", and "Environment" (defaults to "master"). Within the `.env` file, I added the following contents:
    ```
    CONTENTFUL_SPACE="<YOUR_CONTENTFUL_SPACE>"
    CONTENTFUL_TOKEN="<YOUR_CONTENTFUL_TOKEN>"
    CONTENTFUL_ENVIRONMENT="<YOUR_CONTENTFUL_ENVIRONMENT>"
    ```
    *Note: if you use this repo, you will need to create your own .env file and set up your own variables*
  5. Contentful is now set up and ready to be linked to your Gridsome site

### 3. Set up and integratre Tailwind CSS:
  1. Tailwind installed and initialised: `npm i tailwindcss`, `npx tailwind init`
  2. Global CSS file created in `src/assets/css` called `global.css` (folders under src manually created in the process, as a slight variation from the default Tailwind [setup for Vue](https://tailwindcss.com/docs/guides/vue-3-vite). File text:
  ```
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
  3. Imported .css file to `/main.js` by adding the line `import "./assets/css/global.css";`
  4. Added tailwind to gridsome by adding `const tailwindcss = require("tailwindcss")` to `gridsome.config.js`
  5. Tailwind is now ready to kick butts on our site

#### 4. Link Contenful and Tailwind CSS to our gridsome site infrastructure:
  1. Edited `gridsome.config.js` to have the following project settings and plugin links:
  ```
  module.exports = {
    siteName: '<YOUR_SITE_NAME>',
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
  ```
  2. **NOTE!**: Test that gridsome can build fine. If it fails, your problem might be PostCSS compatibility. 🚨 If you get such errors, Tailwind has created a [compatibility version](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build). This means: (a) remove broken packages (`npm uninstall tailwindcss postcss autoprefixer`) and (b)_reinstall the compatible verion (`npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 --force`). Once the rest of your tools have added support for PostCSS 8, you will be able to move off of the compatibility build by [re-installing Tailwind and its peer-dependencies using the latest tag](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build).

#### 5. Creating content (e.g. a Blog)
  1. Under the pages folder, added a file called `Blog.vue`.
  2. Filled blog with the [template](https://gridsome.org/docs/templates/) data and a basic element layout for the templated page:
  ```
  <template>
      <Layout>
      <div class="container grid grid-cols-1 justify-center px-auto mx-auto flex flex-wrap flex-col md:flex-row items-center ">
       <div class="mx-0 px-auto max-w-xl mx-auto">
    <h1 class="text-2xl font-bold leading-tight mb-6 mt-4 text-center text-primary">Blog</h1>
    <ul>
      <li v-for="{ node } in $page.posts.edges" :key="node.id">
    <g-link :to="node.path">
       <div class=" border-solid border-2 border-primary max-auto-sm overflow-hidden shadow-lg p-20 m-4 rounded-md">
    <h1 class="text-2xl text-primary font-bold">  {{node.title}}  </h1>
    <p class="pt-5 text-darkgray"> {{node.description}} </p>
    <p class="font-normal text-sm pt-5 text-primary"> Posted on {{node.date}} </p>
    </div>
    </g-link>
      </li>

    </ul>

    </div>
    </div>
      </Layout>
    </template>

    <page-query>
    query Posts {
      posts: allContentfulBlogPost {
    edges {
      node {
        id,
        title,
        description,
        date (format: "MMMM DD, YYYY"),
        path

      }
    }
      }
    }
    </page-query>

    <script>
    export default {
      metaInfo: {
    title: 'Blog'
      }
    }
    </script>
  ```
  3. Install Markdown-it: `npm install markdown-it` to read the content from Contentful


#### 6. Editing the menu bar
1. Edit the Default (Gridsome [Layouts](https://gridsome.org/docs/layouts/)): add `<g-link class="nav__link" to="/blog/">Blog</g-link>` and `<g-link class="nav__link" to="/frequently-asked-questions/">FAQ</g-link>` below `<g-link class="nav__link" to="/about/">About</g-link>.`




### TODO

* Modify our Default.vue layout and update the Index.vue page (aka, the home). *(doing)*
* Customizing our Header and Footer (Default.vue layout)
* Add a few modifications and styling



### Debugging

Deepgodara (github user) reported the following error:
```
Error: A content type for the ContentfulBlogPost template does not exist.
    at /Users/deep/Documents/GitHub/gridsome-portfolio-site/node_modules/gridsome/lib/plugins/TemplatesPlugin.js:238:17
    at Plugins.run (/Users/deep/Documents/GitHub/gridsome-portfolio-site/node_modules/gridsome/lib/app/Plugins.js:141:17)
    at Plugins.createSchema (/Users/deep/Documents/GitHub/gridsome-portfolio-site/node_modules/gridsome/lib/app/Plugins.js:85:32)
    at Object.fn (/Users/deep/Documents/GitHub/gridsome-portfolio-site/node_modules/gridsome/lib/app/Plugins.js:30:18)
    at fn (/Users/deep/Documents/GitHub/gridsome-portfolio-site/node_modules/gridsome/lib/app/App.js:72:27)
    at _next0 (eval at create (/Users/deep/Documents/GitHub/gridsome-portfolio-site/node_modules/tapable/lib/HookCodeFactory.js:74:10), <anonymous>:47:17)
    at eval (eval at create (/Users/deep/Documents/GitHub/gridsome-portfolio-site/node_modules/tapable/lib/HookCodeFactory.js:74:10), <anonymous>:65:1)
    at processTicksA
```
