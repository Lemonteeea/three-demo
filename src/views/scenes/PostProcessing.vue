<script setup lang="ts">
import { adjustRender, commonRender } from '@/utils/3dtools'
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  NearestFilter,
  PCFSoftShadowMap,
  PlaneGeometry,
  RepeatWrapping,
  TextureLoader,
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { onMounted, ref } from 'vue'

const canvas = ref(null as null | HTMLCanvasElement)
onMounted(async () => {
  const { renderer, scene, camera } = commonRender(
    canvas.value as HTMLCanvasElement,
  )
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)
  const glitchPass = new GlitchPass()
  composer.addPass(glitchPass)

  camera.position.y = 5
  camera.position.z = 10
  camera.lookAt(0, 0, 0)
  const ambientLight = new AmbientLight(0xFFFFFF, 0.3)
  const directionalLight = new DirectionalLight(0xFFFFFF, 0.9)
  directionalLight.position.y = 10
  directionalLight.position.x = -5
  const { shadowMap } = renderer
  shadowMap.enabled = true
  shadowMap.type = PCFSoftShadowMap
  directionalLight.castShadow = true
  scene.add(ambientLight, directionalLight)

  const textureLoader = new TextureLoader()
  const floorTexture = await textureLoader.loadAsync('checker.png')
  const planeSize = 40
  floorTexture.wrapS = RepeatWrapping
  floorTexture.wrapT = RepeatWrapping
  floorTexture.magFilter = NearestFilter
  const repeats = planeSize / 2
  floorTexture.repeat.set(repeats, repeats)

  const floorMaterial = new MeshPhongMaterial({
    map: floorTexture,
    side: DoubleSide,
  })
  const floorGeometry = new PlaneGeometry(planeSize, planeSize)
  const floor = new Mesh(floorGeometry, floorMaterial)
  floor.rotation.x = -0.5 * Math.PI
  floor.receiveShadow = true
  scene.add(floor)
  const geometry = new BoxGeometry()
  const material = new MeshPhongMaterial({
    color: 0x0DBC79,
  })
  const cube = new Mesh(geometry, material)
  cube.position.setY(1)
  cube.castShadow = true
  scene.add(cube)
  function animate(time: number) {
    cube.rotation.x = time / 2
    cube.rotation.y = time / 2
  }
  adjustRender(renderer, scene, camera, {
    beforeRender: animate,
    afterRender: () => composer.render(),
  })
})
</script>

<template>
  <canvas ref="canvas" />
</template>
