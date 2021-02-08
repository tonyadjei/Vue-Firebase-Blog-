<template>
  <div class="tag-cloud">
      <h3>Tags</h3>
      <div v-for="tag in tags" :key="tag">
          <router-link :to="{ name: 'Tag' , params: { tag: tag} }">
              #{{ tag }}
          </router-link>
      </div>
  </div>
</template>

<script>
import tagsCloud from '../composables/tagsCloud'

export default {
    props: ['posts'],
    setup(props){ // when the setup() function is called, vue automatically passes the props property as an argument to it.
        const { tags } = tagsCloud(props.posts)
        return { tags }
    }

}
</script>

<style>
    .tag-cloud{
        padding: 10px;
    }
    .tag-cloud h3{
        border-bottom: 1px solid #eee;
        padding: 16px 8px;
        color: #444;
    }
    .tag-cloud div{
        display: inline-block;
        padding: 10px;
    }
    .tag-cloud a { /* here, we are styling the router-link tags */
        color: #ccc;
        text-decoration: none; /* very important, take away default link styling(the underline) */
    }
    .tag-cloud a:hover{
        color: #aaa;
    }
    .tag-cloud a.router-link-active{
        color: #ff8800;
        font-weight: bold;
    }
</style>