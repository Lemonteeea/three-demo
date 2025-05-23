<script setup lang="ts">
import { adjustRender, commonRender } from '@/utils/3dtools'
import {
  AmbientLight,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PointLight,
  SphereGeometry,
} from 'three'
import { onMounted, ref } from 'vue'

const canvas = ref(null as null | HTMLCanvasElement)
onMounted(() => {
  const { renderer, scene, camera } = commonRender(
    canvas.value as HTMLCanvasElement,
  )
  camera.position.z = 40
  const ambientLight = new AmbientLight(0xFFFFFF, 0.5)
  const pointLight = new PointLight(0xFFFFFF, 2)
  scene.add(ambientLight, pointLight)
  // 太阳、地球、月亮共用这个几何体
  const sphereGeometry = new SphereGeometry(1, 16, 8)
  // 添加太阳和太阳系
  const sunMaterial = new MeshPhongMaterial({
    color: 0xFF0000,
    emissive: 0xFF7700,
  })
  const sun = new Mesh(sphereGeometry, sunMaterial)
  sun.scale.set(5, 5, 5)
  const solarSystem = new Object3D()
  solarSystem.add(sun)
  scene.add(solarSystem)
  // 添加地球和地球轨道到太阳系
  const earthMaterial = new MeshPhongMaterial({
    color: 0x2233FF,
  })
  const earth = new Mesh(sphereGeometry, earthMaterial)
  const earthOribit = new Object3D()
  earthOribit.position.set(-15, 0, 0)
  earthOribit.add(earth)
  solarSystem.add(earthOribit)
  // 添加月亮到地球轨道
  const moonMaterial = new MeshPhongMaterial({
    color: 0xFFFF00,
  })
  const moon = new Mesh(sphereGeometry, moonMaterial)
  moon.position.x = 2
  moon.scale.set(0.5, 0.5, 0.5)
  earthOribit.add(moon)
  // 旋转动画
  const objects = [] as Object3D[]
  objects.push(solarSystem, earthOribit)
  function animate(time: number) {
    objects.forEach((obj) => {
      obj.rotation.z = time / 2
    })
  }
  adjustRender(renderer, scene, camera, { beforeRender: animate })
})
</script>

<template>
  <canvas ref="canvas" />
</template>
