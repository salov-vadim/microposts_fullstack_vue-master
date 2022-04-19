<script setup>
import {onMounted, ref} from "vue";

import PostService from "../PostService";

const posts = ref([])
const error = ref('')
const text = ref('')

onMounted(async ()=>{
  try {
    posts.value = await PostService.getPosts()
  } catch (e) {
    error.value = e.message
  }
})

const createPost = async ()=>{
  await PostService.insertPost(text.value)
  posts.value = await PostService.getPosts()
}

const deletePost = async (id)=>{
  await PostService.deletePost(id)
  posts.value = await PostService.getPosts()
}

</script>

<template>
  <div class="container">
    <div class="create-post">
      <label for="create-post">
        <input type="text" id="create-post" v-model="text" placeholder="Create a post">
        <button @click="createPost" style="margin-left: 5px">Post!</button>
      </label>
    </div>
    <h1>Latest Posts</h1>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container" v-if="posts.length">
      <div class="post" v-for="(post, index) in posts"
           :item="post"
           :index="index"
           :key="post._id"
           @dblclick="deletePost(post._id)"
      >
        {{ `${post.createdAt?.getDate()}.${post.createdAt?.getMonth()+1}.${post.createdAt?.getFullYear()}`}}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px;
  background-color: darkgreen;
  color: azure;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
