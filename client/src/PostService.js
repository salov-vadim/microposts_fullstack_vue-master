import axios from "axios";

const url = 'api/posts/'


class PostService {

  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(data.map(post => ({
          ...post,
          createdAt: new Date(post.createdAt)
        })))

      } catch (e) {
        reject(e)
      }
    })
  }

  static insertPost(text) {
    return axios.post(url, {text})
  }

  static deletePost(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default PostService
