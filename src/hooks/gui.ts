import GUI from 'lil-gui'
import { onUnmounted } from 'vue'

export function useGui() {
  const gui = new GUI()
  onUnmounted(() => {
    console.log('unmounted')
    gui.destroy()
  })
  return gui
}
