import { WebGLRenderer, Scene, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
interface AdjustRenderOptions {
  beforeRender?: (time: number) => void;
  afterRender?: (time: number) => void;
  useOrbitControl?: boolean;
}
export function adjustRender(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  { beforeRender, afterRender, useOrbitControl = true }: AdjustRenderOptions
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
  let control: OrbitControls;
  if (useOrbitControl) {
    control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
  }
  function render(time: number) {
    time *= 0.001;
    control?.update();
    beforeRender && beforeRender(time);
    renderer.render(scene, camera);
    afterRender && afterRender(time);
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
  const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
    precision: "highp",
  });
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  return { renderer, scene, camera };
}
