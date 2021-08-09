<template>
  <div class="container">
    <h1>Posts</h1>
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" id="create-post" v-model="text" />
      <button @click="createPost">Post</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        @dblclick="deletePost(post._id)"
        v-for="(post, idx) in posts"
        :key="idx"
      >
        {{
          `${post.createAt.getDate()}/${post.createAt.getMonth()}/
        ${post.createAt.getFullYear()}`
        }}

        <div class="text">
          {{ post.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../postService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
    };
  },
  methods: {
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<style scoped>
.container {
  width: 44%;
  margin: auto;
}
.post {
  width: 300px;
  background-color: cadetblue;
  padding: 30px;
  margin: 11px auto;
}
</style>
