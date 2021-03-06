import { DeviceInfo, Capacitor, WebPlugin, Plugins, registerWebPlugin } from '@capacitor/core'
import settings from './settings'
import throttle from 'lodash-es/throttle'

// custom web plugin registration done here for now
// because importing code from node_modules causes capacitor runtime code to
// be included twice
if (Capacitor.platform === 'web') {
  class SoundEffectWeb extends WebPlugin {

    private audioMap: { [id: string]: HTMLAudioElement | undefined } = {}

    constructor() {
      super({
        name: 'SoundEffect',
        platforms: ['web']
      })
    }

    async loadSound({ id, path }: { id: string, path: string }): Promise<void> {
      const audio = new Audio()
      audio.setAttribute('src', path)
      audio.load()
      this.audioMap[id] = audio
    }

    async play({ id }: { id: string }): Promise<void> {
      const audio = this.audioMap[id]
      if (audio) audio.play()
    }
  }

  const SoundEffect = new SoundEffectWeb()

  registerWebPlugin(SoundEffect)
}

let shouldPlay: boolean

export default {
  load(info: DeviceInfo): Promise<void> {
    shouldPlay = settings.general.sound()
    const ext = info.platform === 'ios' ? '.aifc' : '.mp3'

    return Promise.all([
      Plugins.SoundEffect.loadSound({ id: 'move', path: `sounds/move${ext}` }),
      Plugins.SoundEffect.loadSound({ id: 'capture', path: `sounds/capture${ext}` }),
      Plugins.SoundEffect.loadSound({ id: 'explosion', path: `sounds/explosion${ext}` }),
      Plugins.SoundEffect.loadSound({ id: 'lowtime', path: `sounds/lowtime${ext}` }),
      Plugins.SoundEffect.loadSound({ id: 'dong', path: `sounds/dong${ext}` }),
      Plugins.SoundEffect.loadSound({ id: 'berserk', path: `sounds/berserk${ext}` }),
      Plugins.SoundEffect.loadSound({ id: 'clock', path: `sounds/clock${ext}` }),
      Plugins.SoundEffect.loadSound({ id: 'confirmation', path: `sounds/confirmation${ext}` }),
    ]).then(() => {})
  },
  move() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'move' })
  },
  throttledMove: throttle(() => {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'move' })
  }, 50),
  capture() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'capture' })
  },
  throttledCapture: throttle(() => {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'capture' })
  }, 50),
  explosion() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'explosion' })
  },
  throttledExplosion: throttle(() => {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'explosion' })
  }, 50),
  lowtime() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'lowtime' })
  },
  dong() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'dong' })
  },
  berserk() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'berserk' })
  },
  clock() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'clock' })
  },
  confirmation() {
    if (shouldPlay) Plugins.SoundEffect.play({ id: 'confirmation' })
  },
  onSettingChange(v: boolean) {
    shouldPlay = v
  }
}
