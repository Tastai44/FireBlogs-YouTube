import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import ForgotPassword from "../views/ForgotPassword.vue"
import Profile from "../views/Profile.vue"
import CreatePost from "../views/CreatePost.vue"
import BlogPreview from "../views/BlogPreview.vue"
import ViewBlog from "../views/ViewBlog.vue"
import EditBlog from "../views/EditBlog.vue"
import Search from "../views/Search.vue"
import ContactUs from "../views/ContactUs.vue"
import EditComment from "../views/Edit-comment.vue"



// import Admin from "../views/Admin.vue"



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home'
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      title: 'Search'
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: 'Blogs'
    },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login'
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register'
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password'
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Profile'
    },
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: Admin,
  //   meta: {
  //     title: 'Admin'
  //   },
  // },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: 'CreatePost'
    },
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs,
    meta: {
      title: 'ContactUs'
    },
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: 'BlogPreview'
    },
  },
  {
    path: "/view-blog:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: 'View Blog Post'
    },
  },
  {
    path: "/edit-blog:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: 'Edit Blog Post'
    },
  },
  {
    path: "/edit-comment:comid",
    name: "EditComment",
    component: EditComment,
    meta: {
      title: 'Edit Comment Post'
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
