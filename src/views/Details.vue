<template>
  <div v-if="error">{{ error }} </div>
  <div v-if="post" class="post">
      <h3>{{ post.title }}</h3>
      <p class="pre">{{ post.body }}</p>
      <button @click="deletePost" class="delete">delete post</button>
  </div>
  <div v-else>
      <Spinner />
  </div>
</template>

<script>
import getPost from '../composables/getPost'
import Spinner from '../components/Spinner.vue'
import { useRoute, useRouter } from 'vue-router'
import { projectFirestore } from '../firebase/config'

export default {
    props: ['id'], // if your prop is coming from a route parameter, then its name is the name of the route parameter.
    components: { Spinner },
    setup(props){ //remember, in the Composition API, when you want to use props inside the setup() function, just use the props property as a parameter to the setup() function, and then you can say props.<yourPropName>, the reason is becuase, when the setup() function is ran, vue automatically passes the props property as an argument to it.
        const route = useRoute()
        const router = useRouter()
        console.log(route)
        //use of route.params.<nameofrouteparameter> can be very useful when we are not receiving the route parameter as a prop from a component, for example, a nav-bar link
        const { post, error, load } = getPost(route.params.id) //deconstructoring
        load()
        const deletePost = async () => {
            await projectFirestore.collection('posts').
            doc(props.id)
            .delete() // yes, that is how we delete objects in firebase
            router.push({ name: 'Home' })
        }
        return { post, error, deletePost } // you return things you want to use inside the template of the component. Always remember to return your setup() function's variables and functions
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
button.delete{
    margin: 10px auto;
}

</style>