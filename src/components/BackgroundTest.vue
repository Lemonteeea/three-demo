<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  AmbientLight,
  DirectionalLight,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  WebGLCubeRenderTarget,
} from "three";
import { adjustRender, commonRender } from "../utils/3dtools";
const canvas = ref(null as null | HTMLCanvasElement);
onMounted(async () => {
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

  // 直接将图片作为背景
  // const loader = new TextureLoader();
  // const texture = await loader.loadAsync("p1.jpg");
  // scene.background = texture;

  // 使用六张图构成全景作为背景
  // const loader = new CubeTextureLoader();
  // const texture = loader.load([
  //   "pos-x.jpg",
  //   "neg-x.jpg",
  //   "pos-y.jpg",
  //   "neg-y.jpg",
  //   "pos-z.jpg",
  //   "neg-z.jpg",
  // ]);
  // scene.background = texture;

  // 使用一张全景图作为背景
  const loader = new TextureLoader();
  const texture = await loader.loadAsync("equirectangular.jpg");
  const cubeRt = new WebGLCubeRenderTarget(texture.image.height);
  cubeRt.fromEquirectangularTexture(renderer, texture);
  scene.background = cubeRt.texture;

  // 添加场景中其他对象
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
