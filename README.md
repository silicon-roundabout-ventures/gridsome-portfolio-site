# Silicon Roundabout Ventures new JAMstack website

## Overview


## Stack used
 * Gridsome

### Gridsome infrastructure
`.vue` components in the `src/pages` directory create page routes. `gridsome build` generates static files in a `/dist` folder. [Here](https://gridsome.org/docs/core-concepts/) you can find the key concepts behind the gridsome architecture.


### Tools used

* text editor (Atom)
* terminal
* npm

### Dev Log

1. Project setup:
  1. Installed the gridsome command line toolkit via `sudo npm install --global @gridsome/cli`
  2. Gridsome [project infrastructure](https://gridsome.org/docs/#how-to-install) created with `gridsome create gridsome-portfolio-site`, entered via `cd gridsome-portfolio-site`, and linked to github repo:
    * `git init`
    * `git remote add origin <Remote repository URL>`
    * `git add .`
    * `git commit -am "Gridsome setup"`
    * `git pull origin main --allow-unrelated-histories`
    * Conflicts merged appropriately
    * `git push <remote> <branch>`
    * *Note: I made my life more difficult by wanting to merge an existing repo with basic files in it ─I could have just made the repo locally and pushed it fresh to Github. It was totally useless to do what I did ;p*
  3. Gridsome local server started: `gridsome develop` (now I can check the site out on http://localhost:8080)
  4. Followed the [Create Page section here](https://stuffwelearned.com/blog/building-your-website-with-gridsome-a-complete-guide/#creating-pages) to set up and play around with the basic Gridsome framework
2. Contentful setup and integration:
  1. Headed over to [Contentful](https://www.contentful.com), created a free account, and create a new space. You can create a new blank space, or use the "Blog" example space. For ease of use, I'll be choosing the blog example space. Spaces are where the Contentful webapp stores content. They are available at [app.contentful.com](https://app.contentful.com/)
  2. Install the [Contenful Gridsome plugin](https://gridsome.org/plugins/@gridsome/source-contentful): `npm add @gridsome/source-contentful`
  3. In the root of the project, I added a file called `.env` to locally store the Contentful environmental variables that are unique to my space. To find these, I logged into Contentful and under `Settings >> API Keys` I could generate the environmental keys "Space ID", "Access Token", and "Environment" (defaults to "master"). Within the `.env` file, I added the following contents:
    ```
    CONTENTFUL_SPACE="<YOUR_CONTENTFUL_SPACE>"
    CONTENTFUL_TOKEN="<YOUR_CONTENTFUL_TOKEN>"
    CONTENTFUL_ENVIRONMENT="<YOUR_CONTENTFUL_ENVIRONMENT>"
    ```
    *Note: if you use this repo, you will need to create your own .env file and set up your own variables*
  4. Contentful is now set up and linked to your Gridsome site
3. Set up and integratre Tailwind CSS:
  1. ...
