const gs = {
  paddleWidth: 10,
  paddleHeight: 100,
  paddleSpeed: 200,
  score: 0,
}

function preload() {
}

function create() {
  gs.player = this.add.rectangle(100, 100, gs.paddleWidth, gs.paddleHeight, 0x40d080)
  this.physics.add.existing(gs.player)
  gs.player.body.collideWorldBounds = true
  gs.player.body.immovable = true

  gs.cpu = this.add.rectangle(700, 100, gs.paddleWidth, gs.paddleHeight, 0xc06060)
  this.physics.add.existing(gs.cpu)
  gs.cpu.body.collideWorldBounds = true
  gs.cpu.body.immovable = true

  gs.ball = this.add.circle(400, 300, 5, 0xe09040)
  this.physics.add.existing(gs.ball)
  gs.ball.body.velocity.x = -150
  gs.ball.body.velocity.y = -150
  gs.ball.body.bounce.y = 1
  gs.ball.body.bounce.x = 1
  gs.ball.body.collideWorldBounds = true

  this.physics.add.collider(gs.player, gs.ball, hitPlayer)
  this.physics.add.collider(gs.cpu, gs.ball, hitCpu)

  gs.scoreText = this.add.text(350, 10, 'Score: ' + gs.score, { fontSize: '16px', fill: '#ed0' })

  gs.cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  if (gs.cursors.down.isDown) {
    gs.player.body.velocity.y = gs.paddleSpeed
  }
  else if (gs.cursors.up.isDown) {
    gs.player.body.velocity.y = -gs.paddleSpeed
  }
  else {
    gs.player.body.velocity.y = 0
  }

  if (gs.ball.body.velocity.x > 0) {
    const cpuBallDiff = gs.cpu.y - gs.ball.y
    if (cpuBallDiff < -45) {
      gs.cpu.body.velocity.y = gs.paddleSpeed
    }
    else if (45 < cpuBallDiff) {
      gs.cpu.body.velocity.y = -gs.paddleSpeed
    }
  }
  else {
    gs.cpu.body.velocity.y = 0
  }

  if (gs.ball.x < 50) {
    this.physics.pause()
    this.add.text(300, 200, 'Game over', { fontSize: '36px', fill: '#a35' })
  }
  else if (750 < gs.ball.x) {
    this.physics.pause()
    this.add.text(300, 200, 'You win!', { fontSize: '36px', fill: '#9d5' })
  }
}

function hitPlayer(paddle, ball) {
  gs.ball.body.velocity.y += (ball.y - paddle.y)
  gs.score += 1
  gs.scoreText.text = 'Score: ' + gs.score
}

function hitCpu() {
  gs.ball.body.velocity.y = Math.floor(Math.random() * 400) - 200
}

const config = {
  width: 800,
  height: 600,
  backgroundColor: '#333',
  physics: {
    default: 'arcade',
  },
  scene: {
    preload,
    create,
    update,
  }
}

const game = new Phaser.Game(config)