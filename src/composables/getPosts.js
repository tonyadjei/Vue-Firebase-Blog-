import { ref } from 'vue' //importing dependencies for the getPost() composable (reusable composition function)
import { projectFirestore } from '../firebase/config'

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const load = async () => { // when you declare a function with the async keyword, you can then use await inside it(which waits until a promise is resolved)
      try {
        // let data = await fetch("http://localhost:3000/posts")
        // if (!data.ok){
        //   throw Error('no data available')
        // }
        // posts.value = await data.json()
        // error.value = null
        const response = await projectFirestore.collection('posts')
        .orderBy('createdAt', 'desc') //for time, ordering in 'desc' descending mode is the best becuase the biggest timestamp value is the more recent one.
        .get()
        posts.value = response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } // here, we account for our 'id' property which is not represented in the firebase database because firebase handles indexing automatically for us(in our case), but we need it inside our projects so we create it again, and we get the value for an 'id' from saying doc.id
        })
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { posts, error, load }
}
export default  getPosts // export the composable, (learn about the default keyword and what it means, and how to export wihout the default keyword)