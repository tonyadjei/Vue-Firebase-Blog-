<template>
    <header>
        <h1>Tony's blog</h1>
        <nav>
            <router-link :to="{ name: 'Home' }">Home</router-link>
            <router-link :to="{ name: 'Create' }">Create Post</router-link>

        </nav>
    </header>
</template>

<script>
export default {
    
}
</script>

<style>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
    }
    header h1{
        color: #dfdfdf;
        font-size: 48px;
    }
    header a{ /* remeber, we use anchor tags to style router-link tags */
        color: #bbb;
        text-decoration: none;
        margin-left: 20px;
    }
    header a.router-link-active{ /* router-link-active is a class that is applied to router-links by Vue, automatically, when they are clicked */
        color: #444;
        font-weight: bold;
    }
</style>