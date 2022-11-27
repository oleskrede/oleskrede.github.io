import FpsText from '../objects/fpsText'
import playerSheetUrl from '../assetes/img/player-sheet.png'
import { config } from '../game'
import Player from '../objects/player'

export default class MainScene extends Phaser.Scene {
    fpsText!: FpsText
    player!: Player

    constructor() {
        super({ key: 'MainScene' })
    }

    preload() {
        this.load.spritesheet('player', playerSheetUrl, { frameWidth: 24, frameHeight: 24 })
    }

    create() {
        this.fpsText = new FpsText(this)

        // display the Phaser.VERSION
        this.add
            .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
                color: '#000000',
                fontSize: '24px'
            })
            .setOrigin(1, 0)

        this.physics.world.setBounds(0, 0, config.scale.width, config.scale.height)
        this.player = new Player(this, 50, config.scale.height-50)

    }

    update() {
        this.fpsText.update()
        this.player.update()
    }
}