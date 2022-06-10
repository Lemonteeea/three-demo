<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { useRouter, useRoute } from "vue-router";

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const router = useRouter();
const route = useRoute();
function handleBack() {
  router.replace("/");
}
</script>

<template>
  <button v-if="route.path !== '/'" @click="handleBack" class="back">
    back
  </button>
  <router-view></router-view>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
canvas {
  width: 100%;
  height: 100%;
}
.back {
  position: absolute;
  top: 3vw;
  left: 3vw;
}
button {
  padding: 1vw 3vw;
  color: #ffffff;
  font-size: 4vw;
  background-color: transparent;
  border: none;
  outline: none;
}
</style>
