<template>
  <div v-if="error">{{ error }} </div>
  <div v-if="post" class="post">
      <h3>{{ post.title }}</h3>
      <p class="pre">{{ post.body }}</p>
  </div>
  <div v-else>
      <Spinner />
  </div>
</template>

<script>
import getPost from '../composables/getPost'
import Spinner from '../components/Spinner.vue'
import { useRoute } from 'vue-router'

export default {
    props: ['id'],
    components: { Spinner },
    setup(props){
        const route = useRoute()
        console.log(route)
        //use of route.params.<nameofrouteparameter> can be very useful when we are not receiving the route parameter as a prop from a component, for example, a nav-bar link
        const { post, error, load } = getPost(route.params.id) //deconstructoring
        load()

        return { post, error } // you return things you want to use inside the template of the component
    }
}
</script>

<style>
.post{
    max-width: 1200px;
    margin: 0 auto;
}
.post p{
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
}
.pre {
    white-space: pre-wrap;
}

</style>