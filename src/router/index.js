import { createRouter, createWebHistory } from "vue-router";
import BlogHome from "../views/BlogHome.vue";
import BlogPost from "../views/BlogPost.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "blog-home",
      component: BlogHome,
    },
    {
      path: "/:slug",
      name: "blog-post",
      component: BlogPost,
    },
  ],
});

export default router;
