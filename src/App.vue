<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
function handleBack() {
  router.replace('/')
}
</script>

<template>
  <button v-if="route.path !== '/'" class="back" @click="handleBack">
    back
  </button>
  <router-view />
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.back {
  position: absolute;
  top: 3vw;
  left: 3vw;
}
button {
  padding: 1vw 3vw;
  font-size: 2rem;
  color: #ffffff;
  outline: none;
  background-color: transparent;
  border: none;
}
</style>
