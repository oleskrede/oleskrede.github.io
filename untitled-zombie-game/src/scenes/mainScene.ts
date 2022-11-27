import FpsText from '../objects/fpsText'
import phaserLogoUrl from '../assets/img/phaser-logo.png'
import playerSheetUrl from '../assets/img/player-sheet.png'
import { config } from '../game'
import Player from '../objects/player'
import PhaserLogo from '../objects/phaserLogo'

export default class MainScene extends Phaser.Scene {
    fpsText!: FpsText
    player!: Player

    constructor() {
        super({ key: 'MainScene' })
    }

    preload() {
        this.load.image('phaser-logo', phaserLogoUrl)

        this.load.image('player', playerSheetUrl)//, { frameWidth: 24, frameHeight: 24 })
    }

    create() {
        new PhaserLogo(this, this.cameras.main.width / 2, 0)
        new Player(this, 50, this.cameras.main.height / 2)
        this.fpsText = new FpsText(this)

        // display the Phaser.VERSION
        this.add
            .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
                color: '#000000',
                fontSize: '24px'
            })
            .setOrigin(1, 0)

        this.physics.world.setBounds(0, 0, config.scale.width, config.scale.height)
        

    }

    update() {
        this.fpsText.update()
        // this.player.update()
    }
}