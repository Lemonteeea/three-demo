<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AmbientLight, DirectionalLight } from "three";
import { adjustRender, commonRender } from "../utils/3dtools";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const modelUrl = "https://project.kivisense.com/tmp-assets/skateboarder.glb";
const canvas = ref(null as null | HTMLCanvasElement);
onMounted(async () => {
  const canvasEl = canvas.value as HTMLCanvasElement;
  const { renderer, scene, camera } = commonRender(canvasEl);
  camera.position.z = 5;
  const ambientLight = new AmbientLight(0xffffff, 1);
  const directionalLight = new DirectionalLight(0xffffff, 1);
  scene.add(ambientLight, directionalLight);
  const loader = new GLTFLoader();
  const res = await loader.loadAsync(modelUrl);
  const model = res.scene;
  model.scale.set(10, 10, 10);
  scene.add(model);
  adjustRender(renderer, scene, camera);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
