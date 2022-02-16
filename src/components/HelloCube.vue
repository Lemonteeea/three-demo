<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { adjustRender } from "../utils/3dtools";
const canvas = ref(null as null | HTMLCanvasElement);
onMounted(() => {
  const el = canvas.value as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({
    canvas: el,
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    el.clientWidth / el.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({
    color: 0x0dbc79,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube, ambientLight, directionalLight);
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

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
