<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">{{error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList v-if="showPosts" :posts="posts" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
    <!-- <button @click="showPosts = !showPosts"> toggle posts </button>
    <button @click="posts.pop()"> delete a post </button> -->

    <!-- <p ref="para">My name is: {{ name }} and my age is {{ age }}</p>
    <button @click="handleClick">click me </button>
    <button @click="age++">add 1 to age</button>
    <input type="text" v-model="name"> so, this v-model directive, is actually two-way binding to name.value, but again, we don't need to do v-model="name.value" because vue automatically uses the value when we say v-model="name" -->
    <!-- <p>{{ ninjaOne.name}} age is {{ ninjaOne.age }}</p>
    <button @click="updateNinjaOne">Update ninja one</button>
    <h2>Reactive below</h2>
    <p>{{ ninjaTwo.name }} age is {{ ninjaTwo.age }}</p>
    <button @click="updateNinjaTwo">Update ninja two</button>
    <input type="text" v-model="search">
    <p>Search term: {{ search }} <span v-if="!matchingNames.length">{{ found }} </span></p> -->
    <!-- <div v-for="name in matchingNames" :key="name"> -->
      <!-- {{ name }}
    </div> --> 
    <!-- <button @click="handleWatch">stop watching</button> -->
  </div>
</template>

<script>
//NOTE: CYCLING THROUGH AN EMPTY ARRAY WITH A FOR LOOP, LIKE WHEN USING V-FOR, DOES NOT GIVE AN ERROR.
//NOTE: AN EMPTY ARRAY IS NOT A FALSY VALUE.
import { ref, reactive, computed, watch, watchEffect } from 'vue' // refs can be used in two ways when used with the Composition API,
import PostList from '../components/PostList.vue'
import getPosts from '../composables/getPosts' // we don't need to say getPosts.js, it automatically knows that it is a javascript file
import Spinner from '../components/Spinner.vue'
import TagCloud from '../components/TagCloud.vue'
// 1. to get a reference to an element in the DOM/template
// 2. to create reactive values/variables inside the setup() function, and use them inside the template

// ANOTHER way of making variables inside the Composition API to be reactive is to use something called 'reactive'
// it works similarly to how we use refs to make a variable reactive in our template
// the only difference is that, with reactive, when you arei inside the setup() function and you are making changes to the value of the reactive variable,
// you don't need to use a .value property, just referencing the name of the reactive variable will point to its value.
// DRAWBACK OF USING REACTIVE: YOU CANNOT USE PRIMITIVE VALUES, ONLY OBJECTS!

//BEST OPTION is to use refs, becuase it allows us to use primitive values and also they retain their reactivity when used with external composition functions

//NOTE: V-IF UNLIKE V-SHOW, CAUSES COMPONENTS TO BE REMOVED OR SHOWN, NOW SINCE ITS OPERATION CAUSES THE COMPONENTS TO BE REMOVED FROM THE DOM
//IT BASICALLY CARRIES OUT MOUNTED() AND UNMOUNTED LIFE CYCLE HOOKS
export default {
  //by using the setup() function or hook, we are using the Composition API
  name: 'Home',
  components: { PostList, Spinner, TagCloud },
  setup(){ // setup() function or hook runs before any life cycle hook runs
    console.log('setup')
     
    // variables in the composition API are not reactive by default: you will have to make them reactive.
    // we can use refs to make variables reactive.
    // using const does not mean the variables cannot change, it only means that the ref object will be constant, but its value, it can change/be modified
    // so using ref, makes values become reactive, so, the value inside the name ref, which was formally a normal variable, now having been made a ref, its value(which we get by sayig name.value), which is the argument we pass to the ref() function, is reactive.
    const name = ref('john')
    const age = ref(100)
    // when you are exporting these refs, don't export their values, export the ref itself.
    // now, when we are using these ref values inside the template, after exporting them, we don't need to say, for example, name.value
    // vue will automatically use the value of the ref for us when we use them as variablese in the template

    const para = ref("hello") // you set a varibale to a ref, by using the ref() function, and you pass an initial value as an argument. The variable itslef is a ref, its .value property is what you are passing as an argument
    console.log(para, para.value)
    
    const handleClick = () => {
      name.value = 'Clara'
      age.value = 21
    }
    const ninjaOne = ref({name: 'mario', age: 20}) 
    const ninjaTwo = reactive({name: 'luigi', age: 100})

    const search = ref("")
    const found = ref("was not found!")

    // both watch and watchEffect return functions which when invoked, stop the watching activity.
    // hence, in using watch of watchEffect, we set them to variables(which in turn become functions) and invoke these when we want to stop the watching
    const stopWatch = watch(search, () => { // we pass in the name of the variable to watch, not its value, and the second parameter is a callback function what would fire when there is a change in that variable
      console.log('watch function ran')
    })

    const stopEffect = watchEffect(() => { // it always runs at least once when the component is loaded/when the setup() function runs
      console.log('watchEffect function ran', search.value) //watchEffect() watches for changes in any dependencies of the callback function and fires when there is a change
    })

    const updateNinjaOne = () => {
      ninjaOne.value.age = 50
    }
    const updateNinjaTwo = () => {
      ninjaTwo.age = 200 //this is the difference between reactive and using a ref, in reactive, making a reference to the reactive variable we have created points to its value directly.
    }
    const names = ref(['tomy', 'sinn', 'clark', 'yougot', 'svenson'])
     //NOTE: when there is a change in any kind of data or variable inside a computed variable function, the computed variable function is run again to reflect new changes
     //VERY VERY VERY VERY VERY IMPORTANT: IN JAVASCRIPT, true === "clark".includes("") will give an output of true.
     //THIS IS SO THAT, IF WE ARE CYCLING THROUGH AN ARRAY, BASED ON THE INPUT FROM A USER TO SEARCH FOR A PARTICULAR ITEM, IF THE USER HAS NOT YET SEARCHED FOR SOMETHING,
     //THEN CYCLING THROUGH THE ARRAY WITH A SEARCH VALUE OF "" (empty string, remember user has not entered anything yet) AGAINST EACH ELEMENT IN THE ARRAY, WILL END UP RETURNING TRUE FOR ALL THE ELEMENTS, AND SO IF WE 
     //WERE USING A FILTER() METHOD ON THE ARRAY, ALL THE ELEMENTS WILL DISPLAY. THEN WHEN THE USER BEGINS TO SEARCH, WE CAN START FILTERING THE ARRAY.
    const matchingNames = computed(() => {// take note, the computed() function when used like this in the Composition API, is returning the function(which returns the computed value). so mathcingNames is actually being set to that function. matchingNames is not being set to the computed value inside the function, it is being set to the function itself.
      return names.value.filter(name => name.includes(search.value))
    })
    const handleWatch = () => {
      stopWatch()
      stopEffect()
    }
    const showPosts = ref(true)
    
    const {posts, error, load } = getPosts()
    load() // this load() function will now run in this scope, and will search this current file, for the posts and error variables, which we also got from getPosts() composable. You can find them on the line above this line you are reading.


    return { load, error, showPosts, posts, stopWatch, stopEffect, found, matchingNames, search, names, name, age, handleClick, para, ninjaOne, updateNinjaOne, ninjaTwo, updateNinjaTwo} //exports the variables so that we can use them inside our component template
  }
}

//note, the data() property that we used in the options API, is reactive, so any changes made to the variable inside the component would reflect in the template/html as well.
//note, concerning computed values, for both the Options API and the Composition API, when you are cycling through a computed value via v-for, you don't need a key attribute.
//secondly, with computed values for both the Options API and the Composition API, the functions we use for our computed values, those functions never take an argument, they just return a computed value
//but with the Composition API, (setup() function), the normal variables that we create, and return as key:value pairs in an object are note reactive, but they can be made reactive
// in the composition API, the 'this' keyword does not refer to the component and is therefore undefined.
// also, to access built-in variales like $refs, $event, $route, we have to import them from vue and then use them, we use them in a different manner: An example is illustrated in the setup() function where we use a ref to get a reference to an html element in the template
// the reference we get from using ref in the composition API is a ref object that wraps around the html element, so to get the actual html element only, use the .value property.
// refs, when used with the Composition API is very important because they can be used to make variables in the setup() function reactive: so any change in the variable would reflect in the DOM/template
</script>

<style>
  .home{
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout{
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }

</style>
