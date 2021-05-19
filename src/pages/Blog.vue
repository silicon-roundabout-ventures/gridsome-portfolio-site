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
