<template>
  <div class="tag">
      <div v-if="error"></div>
      <div v-if="posts.length" class="layout">
          <PostList :posts="filteredArray" />
          <TagCloud :posts="posts" />
      </div>
      <div v-else>
          <Spinner />
      </div>
  </div>
</template>

<script>    
import { useRoute } from 'vue-router'
import getPosts from '../composables/getPosts'
import { ref } from 'vue'
import { computed } from 'vue'
import PostList from '../components/PostList.vue'
import Spinner from '../components/Spinner.vue'
import TagCloud from '../components/TagCloud.vue'

export default {
    components: { PostList, Spinner, TagCloud },
    setup(){
        const route = useRoute()
        const tagID = ref(route.params.tag)
        const { posts, error, load } = getPosts()
        load()
        const filteredArray = computed(() => { // this is a computed value, not a function okay, forget all I said earlier about how the computed() function is returning a function() and not the computed value
            return posts.value.filter( post => post.tags.includes(tagID.value))
        })

        return { filteredArray, error, posts}
    }

} 
</script>

<style>
    .tag{
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
    }
</style>