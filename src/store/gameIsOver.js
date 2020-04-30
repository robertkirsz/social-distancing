import { writable } from 'svelte/store'
import screen from 'store/screen'

const gameIsOver = writable(false)

gameIsOver.subscribe(isOver => {
  if (isOver) screen.open('GAME OVER')
})

export default gameIsOver
