import Vue from 'vue'
import VueRouter from 'vue-router'
import home from "../components/home";
import about from "../components/about";
import demo from "../components/demo";
import newdoc from "../components/newdoc";
import apitest from "../components/apitest";
import apiconf from "../components/apiconf";
import apiabout from "../components/apiabout";
import readdoc from "../components/readdoc";
import middle from "../components/middle";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/middle',
    name: 'middle',
    component: middle
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/demo',
    name: 'demo',
    component: demo
  },
  {
    path: '/readdoc',
    name: 'readdoc',
    component: readdoc,
  },
  {
    path: '/apitest',
    name: 'apitest',
    component: apitest,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/apiconf',
    name: 'apiconf',
    component: apiconf
  },
  {
    path: '/apiabout',
    name: 'apiabout',
    component: apiabout
  },
]

const router = new VueRouter({
  routes
});

export default router
