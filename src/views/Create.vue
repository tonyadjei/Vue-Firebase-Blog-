<template>
    <div class="create">
        <form @submit.prevent="handleSubmit">
            <label>Title:</label>
            <input v-model="title" type="text" required>
            <label>Content:</label>
            <textarea v-model="body" required></textarea>
            <label>Tags (hit enter to add a tag):</label>
            <input v-model="tag" type="text" @keydown.enter.prevent="addTag"> <!-- remember, pressing enter on a from submits the form, we can prevent the default on this event by doing @keydown.enter.prevent-->
            <div v-for="tag in tags" :key="tag" class="pill">
                #{{ tag }}
            </div>
            <button>Add Post</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export default {
    setup(){
        //remember that, inside the setup() the 'this' keyword is undefines, so we don't do things like this.$refs or this.$route
        const router = useRouter()
        const title = ref("")
        const body = ref("")
        const tag = ref("")
        const tags = ref([])
        const addTag = () => {
            if(!tags.value.includes(tag.value)){
                tag.value = tag.value.replace(/\s/, '') //removes all whitespace
                tags.value.push(tag.value)
            }
            tag.value = ''
        }
        const handleSubmit = async () => {
            const post = { // we don't add an id property anymore to the post request we are making because json server automatically handles that for us.
                title: title.value,
                body: body.value,
                tags: tags.value
            }
            await fetch('http://localhost:3000/posts', { // when we are making a POST request with fetch()API, we pass an object as the second argument, which has a <method>, <headers> and <body> property
                method: 'POST',
                headers: {'Content-Type': 'application/json'},// (indicates the kind of data we are sending)
                body: JSON.stringify(post) //the body of our request, which is the actual data we are sending/posting, we have to change it into a JSON string
                //json is a data exchange format, it is a string of data basically, that is formatted to look javascript objects
            })
            router.push({ name: 'Home'}) //instead of using hard coded links, we can use the object {name: <value>}
        }
        return { title, body, tag, addTag, tags, handleSubmit }
    }
}
</script>

<style>
    form{
        max-width: 480px;
        margin: 0 auto;
        text-align: left;
    }
    input, textarea{
        display: block;
        margin: 10px 0;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #eee;
    }
    textarea{
        height: 160px;
    }
    label{
        display: inline-block;
        margin-top: 30px;
        position: relative;
        font-size: 20px;
        color: white;
        margin-bottom: 10px;
    }
    label::before{
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: #ff8800;
        position: absolute;
        z-index: -1; /* maybe postion:absolute must be set before we can use z-index on an element*/
        padding-right: 40px;
        left: -30px;
        transform: rotateZ(-1.5deg); /* rotate it about its center */
    }
    button{
        display: block;
        margin-top: 30px;
        background: #ff8800;
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 18px;
    }
    .pill{
        display: inline-block;
        margin: 10px 10px 0 0;
        color: #444;
        background: #ddd;
        padding: 8px;
        border-radius: 20px;
        font-size: 14px;
    }


</style>