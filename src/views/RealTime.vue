<template>
    <h1>RealTime</h1>
    <div v-for="post in posts" :key="post.id">
        {{ post.title }}
    </div>
</template>

<script>
import { projectFirestore } from '../firebase/config'
import { ref } from 'vue'
export default {
    setup(){
        const posts = ref([])

        projectFirestore.collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snap => { // runs a callback function whenever there is a new change in the database, and passes the new snapshot as an argument to this callback function
            let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            console.log('documents: ', docs)
            posts.value = docs
        })
        return { posts }
    }
}
</script>

<style>

</style>