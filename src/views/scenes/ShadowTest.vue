<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  AmbientLight,
  DirectionalLight,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  DoubleSide,
  PlaneGeometry,
  BasicShadowMap,
  CameraHelper,
} from "three";
import { ShadowMapViewer } from "three/examples/jsm/utils/ShadowMapViewer";
import { adjustRender, commonRender } from "@/utils/3dtools";
import { useGui } from "@/hooks/gui";
const canvas = ref(null as null | HTMLCanvasElement);
const gui = useGui();
const guiObj = {};

onMounted(async () => {
  const { renderer, scene, camera } = commonRender(
    canvas.value as HTMLCanvasElement
  );
  camera.position.y = 5;
  camera.position.z = 10;
  camera.lookAt(0, 0, 0);
  const ambientLight = new AmbientLight(0xffffff, 0.3);
  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.y = 3;
  directionalLight.position.x = -5;
  const { shadowMap } = renderer;
  shadowMap.enabled = true;
  directionalLight.castShadow = true;
  scene.add(ambientLight, directionalLight);

  const shadowMapViewer = new ShadowMapViewer(directionalLight);
  shadowMapViewer.size.set(128, 128);
  shadowMapViewer.position.set(10, 10);

  const textureLoader = new TextureLoader();
  const floorTexture = await textureLoader.loadAsync("checker.png");
  const planeSize = 40;
  floorTexture.wrapS = RepeatWrapping;
  floorTexture.wrapT = RepeatWrapping;
  floorTexture.magFilter = NearestFilter;
  const repeats = planeSize / 2;
  floorTexture.repeat.set(repeats, repeats);

  const floorMaterial = new MeshPhongMaterial({
    map: floorTexture,
    side: DoubleSide,
  });
  const floorGeometry = new PlaneGeometry(planeSize, planeSize);
  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  scene.add(floor);
  const boxSize = 2;
  const geometry = new BoxGeometry(boxSize, boxSize, boxSize);
  const material = new MeshPhongMaterial({
    color: 0x0dbc79,
  });
  const cube = new Mesh(geometry, material);
  cube.position.setY(1);
  cube.castShadow = true;
  scene.add(cube);
  renderer.shadowMap.type = BasicShadowMap;

  const cameraHelper = new CameraHelper(directionalLight.shadow.camera);
  scene.add(cameraHelper);
  function animate(time: number) {
    shadowMapViewer.render(renderer);
    cube.rotation.x = time / 2;
    cube.rotation.y = time / 2;
  }
  adjustRender(renderer, scene, camera, { afterRender: animate });
  const { shadow } = directionalLight;
  shadow.mapSize.setScalar(256);

  // add gui
  gui.add(shadow, "autoUpdate");
  gui.add(shadow, "bias");
  gui.add(floor, "castShadow").name("floor castShadow");
  const light = gui.addFolder("light");
  [
    light.add(directionalLight.position, "x"),
    light.add(directionalLight.position, "y"),
    light.add(directionalLight.position, "z"),
    light.add(shadow.camera, "left"),
    light.add(shadow.camera, "right"),
    light.add(shadow.camera, "top"),
    light.add(shadow.camera, "bottom"),
  ].forEach((v) => {
    v.onChange(updateCamera);
  });
  function updateCamera() {
    // update the light target's matrixWorld because it's needed by the helper
    directionalLight.target.updateMatrixWorld();
    cameraHelper.update();
    // update the light's shadow camera's projection matrix
    directionalLight.shadow.camera.updateProjectionMatrix();
    // and now update the camera helper we're using to show the light's shadow camera
    cameraHelper.update();
  }
  Reflect.set(guiObj, "autoRotate", true);
  Reflect.set(guiObj, "mapSize", shadow.mapSize.x);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
