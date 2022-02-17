<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloCube from "./components/HelloCube.vue";
import SolarSystem from "./components/SolarSystem.vue";
import LoaderTest from "./components/LoaderTest.vue";
import ShadowTest from "./components/ShadowTest.vue";
import GUI from "lil-gui";
import { ref } from "vue";
const scenes = [{ HelloCube }, { SolarSystem }, { LoaderTest }, { ShadowTest }];
const curr = ref(scenes[0].HelloCube);
const gui = new GUI();
const guiObj = {};

scenes.forEach((obj) => {
  for (const [key, value] of Object.entries(obj)) {
    Reflect.set(guiObj, key, () => {
      curr.value = value;
    });
  }
});
Reflect.ownKeys(guiObj).forEach((key) => {
  if (typeof key === "string") {
    gui.add(guiObj, key);
  }
});
</script>

<template>
  <component :is="curr"></component>
</template>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}
canvas {
  height: 100%;
  width: 100%;
}
</style>
