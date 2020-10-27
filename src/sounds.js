import { Howl, Howler } from 'howler'
import { randomItem } from 'stuff'

Howler.volume(0.5)

const punchSound1 = new Howl({ src: ['sounds/punch_1.mp3'] })
const punchSound2 = new Howl({ src: ['sounds/punch_2.mp3'] })
const punchSound3 = new Howl({ src: ['sounds/punch_3.mp3'] })

export const randomPunch = () => randomItem([punchSound1, punchSound2, punchSound3])

const strongPunchSound1 = new Howl({ src: ['sounds/strong-punch_1.mp3'] })
const strongPunchSound2 = new Howl({ src: ['sounds/strong-punch_2.mp3'] })
const strongPunchSound3 = new Howl({ src: ['sounds/strong-punch_3.mp3'] })

export const randomStrongPunch = () => randomItem([strongPunchSound1, strongPunchSound2, strongPunchSound3])

export const lifeUpSound = new Howl({ src: ['sounds/life-up.ogg'] })
export const lifeDownSound = new Howl({ src: ['sounds/life-down.ogg'] })

export const addShieldSound = new Howl({ src: ['sounds/add-shield.ogg'] })
export const removeShieldSound = new Howl({ src: ['sounds/remove-shield.ogg'] })
