import { Howler, Howl } from 'howler'
import { randomItem } from 'stuff'

Howler.volume(0.1)

export const punchSound1 = new Howl({ src: ['sounds/punch1.mp3'] })
export const punchSound2 = new Howl({ src: ['sounds/punch2.mp3'] })
export const punchSound3 = new Howl({ src: ['sounds/punch3.mp3'] })

export const randomPunch = () => {
  return randomItem([punchSound1, punchSound2, punchSound3])
}

export const oneUpSound = new Howl({
  src: ['sounds/gain-life.ogg']
})
