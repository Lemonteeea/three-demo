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
  camera.position.z = 30;
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  const pointLight = new THREE.PointLight(0xffffff, 2);
  const sphereGeometry = new THREE.SphereGeometry(1, 4, 4);
  const sunMaterial = new THREE.MeshPhongMaterial({
    color: 0xff7700,
  });
  const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
  sun.scale.set(5, 5, 5);
  const solarSystem = new THREE.Object3D();
  solarSystem.add(sun);
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
  });
  const earthOribit = new THREE.Object3D();
  earthOribit.position.set(-15, 0, 0);
  solarSystem.add(earthOribit);
  const earth = new THREE.Mesh(sphereGeometry, earthMaterial);
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
  });
  const moon = new THREE.Mesh(sphereGeometry, moonMaterial);
  moon.position.x = 2;
  moon.scale.set(0.5, 0.5, 0.5);
  earthOribit.add(earth, moon);
  const objects = [] as THREE.Object3D[];
  objects.push(solarSystem, earthOribit);
  scene.add(solarSystem, ambientLight, pointLight);
  function animate(time: number) {
    objects.forEach((obj) => {
      obj.rotation.z = time / 2;
    });
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
