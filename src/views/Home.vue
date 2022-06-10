<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import routes from "@/routes";
import { useRouter } from "vue-router";
import HelloCube from "./scenes/HelloCube.vue";
import { useGui } from "@/hooks/gui";

const router = useRouter();

const gui = useGui();
const guiObj = {};
routes.forEach(({ path }) => {
  const key = path.split("/")[1];
  if (!key) return;
  Reflect.set(guiObj, key, () => {
    router.push(path);
  });
});
Reflect.ownKeys(guiObj).forEach((key) => {
  if (typeof key === "string") {
    gui.add(guiObj, key);
  }
});
</script>

<template>
  <HelloCube />
</template>
