export default class Player extends Phaser.Physics.Arcade.Sprite {
  
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

  speed = 200

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player')


    this.player = scene.physics.add.sprite(x, y, 'player')
    this.player.setCollideWorldBounds(true)

    this.cursors = scene.input.keyboard.createCursorKeys()

    scene.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    })
  }

  update() {
    if (this.cursors.right.isDown) {
      this.player.flipX = false;
      this.player.setVelocityX(this.speed);
      this.player.anims.play("run", true);
    } else if (this.cursors.left.isDown) {
      this.player.flipX = true;
      this.player.setVelocityX(-this.speed);
      this.player.anims.play("run", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.pause()
    }
  }
}