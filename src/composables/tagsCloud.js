// take in an array of posts
// create a new tag set (so no duplicate)
// add the tags of each post to the tag set
// return a single array of tags based on the set

import { ref } from 'vue'

const tagsCloud = (posts) => {

    const tags = ref([]) //array of all unique tags
    const tagSet = new Set()

    posts.forEach(post => {
        post.tags.forEach((tag) => {
            tagSet.add(tag)
        })
    })
    tags.value = [...tagSet] //spread syntax to spread out all items in tagSet as elements for the array

    return { tags } // this is the same as saying { tags: tags } It's just a shortcut version

}

export default tagsCloud