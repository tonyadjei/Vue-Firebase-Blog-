import { ref } from 'vue' //importing dependencies for the getPost() composable (reusable composition function)

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch("http://localhost:3000/posts")
        if (!data.ok){
          throw Error('no data available')
        }
        posts.value = await data.json()
        error.value = null
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { posts, error, load }
}
export default  getPosts // export the composable, (learn about the default keyword and what it means, and how to export wihout the default keyword)