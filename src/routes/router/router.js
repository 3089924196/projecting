import Vue from "vue";
import VueRouter from "vue-router";
import routes from "routes/routes.js"
Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "",
  routes
})