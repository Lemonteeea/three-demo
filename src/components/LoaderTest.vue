<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AmbientLight, DirectionalLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { adjustRender, commonRender, loadGLTF } from "../utils/3dtools";
const modelUrl = "https://project.kivisense.com/tmp-assets/skateboarder.glb";
const canvas = ref(null as null | HTMLCanvasElement);
onMounted(async () => {
  const canvasEl = canvas.value as HTMLCanvasElement;
  const { renderer, scene, camera } = commonRender(canvasEl);
  camera.position.z = 5;
  const ambientLight = new AmbientLight(0xffffff, 1);
  const directionalLight = new DirectionalLight(0xffffff, 1);
  scene.add(ambientLight, directionalLight);

  const res = await loadGLTF(modelUrl);
  const model = res.scene;
  model.scale.set(10, 10, 10);
  scene.add(model);
  const controls = new OrbitControls(camera, canvasEl);
  controls.enableDamping = true;
  function animate() {
    controls.update();
  }
  adjustRender(renderer, scene, camera, animate);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
