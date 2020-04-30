import { writable } from 'svelte/store'

const MINIMUM_RIPPLE_SIZE = 100

const { subscribe, update } = writable([])

const ripples = {
  subscribe,
  show(event) {
    const { left, top } = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - left
    const y = event.clientY - top
    const size = Math.min(event.currentTarget.clientHeight, event.currentTarget.clientWidth, MINIMUM_RIPPLE_SIZE)
    const item = {
      id: event.timeStamp,
      style: `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `
    }

    update(state => [...state, item])
  },
  hide(id) {
    console.log('hide:', id)
    update(state => state.filter(item => item.id !== id))
  }
}

export default ripples
