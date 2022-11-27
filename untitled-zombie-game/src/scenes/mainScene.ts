import FpsText from '../objects/fpsText'
import PhaserLogo from '../objects/phaserLogo'
import phaserLogoUrl from '../assetes/img/phaser-logo.png'

export default class MainScene extends Phaser.Scene {
  fpsText!: FpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.load.image('phaser-logo', phaserLogoUrl)
  }

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
  }

  update() {
    this.fpsText.update()
  }
}