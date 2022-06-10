<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  AmbientLight,
  DirectionalLight,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
} from "three";
import { adjustRender, commonRender } from "@/utils/3dtools";
const canvas = ref(null as null | HTMLCanvasElement);
onMounted(() => {
  const { renderer, scene, camera } = commonRender(
    canvas.value as HTMLCanvasElement
  );
  camera.position.z = 5;
  const ambientLight = new AmbientLight(0xffffff, 1);
  const directionalLight = new DirectionalLight(0xffffff, 1);
  scene.add(ambientLight, directionalLight);
  const geometry = new BoxGeometry();
  const material = new MeshPhongMaterial({
    color: 0x0dbc79,
  });
  const cube = new Mesh(geometry, material);
  scene.add(cube);
  function animate(time: number) {
    cube.rotation.x = time / 2;
    cube.rotation.y = time / 2;
  }
  adjustRender(renderer, scene, camera, animate);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
