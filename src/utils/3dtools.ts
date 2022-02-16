import { WebGLRenderer, Scene, PerspectiveCamera } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export function adjustRender(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  beforeRender?: (time: number) => void
) {
  function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  function render(time: number) {
    time *= 0.001;
    beforeRender && beforeRender(time);
    renderer.render(scene, camera);
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

export function commonRender(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ canvas: canvas });
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  return { renderer, scene, camera };
}

export function loadGLTF(url: string) {
  return new Promise((resolve: (value: GLTF) => void) => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      resolve(gltf);
    });
  });
}
