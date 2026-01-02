import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import GalleryView from '../views/GalleryView.vue'
import StoryView from '../views/StoryView.vue'
import FeaturesView from '../views/FeatureView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/map',
      name:'map',
      component:()=>import('../views/MapView.vue'),
    },
    {
      path:'/gallery',
      name:'gallery',
      component:()=>import('../views/GalleryView.vue'),
    },
    {
      path:'/story',
      name:'story',
      component:()=>import('../views/StoryView.vue'),
    },
    {
      path:'/feature',
      name:'feature',
      component:()=>import('../views/FeatureView.vue'),
    },
    {
      path:'/charm',
      name:'charm',
      component:()=>import('../Gallery/charms.vue'),
    },
    {
      path:'/skill',
      name:'skill',
      component:()=>import('../Gallery/skill.vue'),
    }
  ],
})

export default router
