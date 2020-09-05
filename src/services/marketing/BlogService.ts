import GhostContentAPI from "@tryghost/content-api";

class BlogService {
  api: any;
  constructor() {
    try {
      this.api = new GhostContentAPI({
        url: process.env.VUE_APP_BLOG_GHOST_URL,
        key: process.env.VUE_APP_BLOG_GHOST_CONTENT_API_KEY,
        version: "v3",
      });
    } catch (e) {
      console.log(e);
    }
  }
  async getPosts() {
    return await this.api.posts
      .browse({
        limit: "all",
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async getPost(slug: string) {
    return await this.api.posts.read({
      slug,
    });
  }
}

export const blogService = new BlogService();
