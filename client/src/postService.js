import axios from "axios";

const URL = "http://localhost:5000/api/posts/";

class PostService {
  static async getPosts() {
    try {
      const response = await axios.get(URL);
      const data = response.data;
      let result = data.map((post) => ({
        ...post,
        createAt: new Date(post.createAt),
      }));
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  // Create Post
  static insertPost(text) {
    return axios.post(URL, {
      text,
    });
  }

  // Delete Post
  static deletePost(id) {
    console.log(id);
    return axios.delete(`${URL}${id}`);
  }
}

export default PostService;
