import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

export default [
  { path: '/', component: Home },
  {
    path: '/hello-cube',
    component: () => import('@/views/scenes/HelloCube.vue'),
  },
  {
    path: '/solar-system',
    component: () => import('@/views/scenes/SolarSystem.vue'),
  },
  {
    path: '/loader-test',
    component: () => import('@/views/scenes/LoaderTest.vue'),
  },
  {
    path: '/shadow-test',
    component: () => import('@/views/scenes/ShadowTest.vue'),
  },
  {
    path: '/background-test',
    component: () => import('@/views/scenes/BackgroundTest.vue'),
  },
  {
    path: '/post-processing',
    component: () => import('@/views/scenes/PostProcessing.vue'),
  },
] as RouteRecordRaw[]
