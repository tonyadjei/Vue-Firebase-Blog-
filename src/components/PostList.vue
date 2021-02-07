<template>
  <div class="post-list">
      <div v-for="post in posts" :key="post.id">
          <SinglePost :post="post" />
      </div>
  </div>
</template>

<script>
// import { onMounted, onUnmounted, onUpdated } from 'vue'
import SinglePost from './SinglePost.vue'

export default {
    components: { SinglePost },
    props: ['posts'],
    setup(props){ //to use props inside the setup() function, pass the props property as the first argument to the setup() function
        // onMounted(() => {
        //     console.log('component mounted!')
        // })
        // onUnmounted(() => {
        //     console.log('component umounted')
        // })
        // onUpdated(() => {
        //     console.log('component updated!')
        // })
        //above few lines: just illustrating how to use life cycle hooks in the setup() funciton(for the Composition API)
    }
}
</script>

<style>

</style>