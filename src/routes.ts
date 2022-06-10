import HelloCube from "@/views/scenes/HelloCube.vue";
import SolarSystem from "@/views/scenes/SolarSystem.vue";
import LoaderTest from "@/views/scenes/LoaderTest.vue";
import ShadowTest from "@/views/scenes/ShadowTest.vue";
import BackgroundTest from "@/views/scenes/BackgroundTest.vue";
import Home from "@/views/Home.vue";
export default [
  { path: "/", component: Home },
  {
    path: "/hello-cube",
    component: HelloCube,
  },
  {
    path: "/solar-system",
    component: SolarSystem,
  },
  {
    path: "/loader-test",
    component: LoaderTest,
  },
  {
    path: "/shadow-test",
    component: ShadowTest,
  },
  {
    path: "/background-test",
    component: BackgroundTest,
  },
];
