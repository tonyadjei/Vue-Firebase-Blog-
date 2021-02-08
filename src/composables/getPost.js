import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getPost = (id) => {
    const post = ref(null)
    const error = ref(null)

    const load = async () => {
      try {
        // let data = await fetch("http://localhost:3000/posts/" + id)
        // if (!data.ok){
        //   throw Error('that post does not exist!')
        // }
        // post.value = await data.json()
        // error.value = null
        let response = await projectFirestore.collection('posts').doc(id).get() //this is how we get a single document in firebase, instead of calling .get(), we call .doc().get() then we pass in that documents id inside the .doc() part
        if(!response.exists){
          throw Error('that post does not exist')
        }
        post.value = { ...response.data(), id: response.id }
      }
      catch(err) {
        error.value = err.message
        console.log(error.value)
      }
    }
    return { post, error, load }
}

export default getPost