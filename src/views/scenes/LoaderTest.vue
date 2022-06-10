<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AmbientLight, AnimationMixer, Clock, DirectionalLight } from "three";
import { adjustRender, commonRender } from "../../utils/3dtools";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGui } from "../../hooks/gui";
const modelUrl = "https://project.kivisense.com/tmp-assets/skateboarder.glb";
const canvas = ref(null as null | HTMLCanvasElement);
const gui = useGui();
onMounted(async () => {
  const clock = new Clock();
  const canvasEl = canvas.value as HTMLCanvasElement;
  const { renderer, scene, camera } = commonRender(canvasEl);
  camera.position.z = 5;
  const ambientLight = new AmbientLight(0xffffff, 1);
  const directionalLight = new DirectionalLight(0xffffff, 1);
  scene.add(ambientLight, directionalLight);
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(modelUrl);
  const model = gltf.scene;
  model.scale.set(10, 10, 10);
  scene.add(model);
  // 动画
  const mixer = new AnimationMixer(model);
  function playAnimation(index: number) {
    mixer.stopAllAction();
    mixer.clipAction(gltf.animations[index]).play();
  }
  adjustRender(renderer, scene, camera, () => {
    mixer.update(clock.getDelta());
  });

  // GUI
  const folder = gui.addFolder("动画切换");
  const guiObj = {};
  gltf.animations.forEach((animation, index) => {
    Reflect.set(guiObj, animation.name, () => {
      playAnimation(index);
    });
  });
  for (const key in guiObj) {
    folder.add(guiObj, key);
  }
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
