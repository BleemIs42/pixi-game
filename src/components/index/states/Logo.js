import {
    State,
    Physics
} from 'phaser'
import LogoSprite from './../sprites/Logo'

let fps, start

setInterval(() => {
    const last = Date.now()
    fps = parseInt(1000 / (last - start))
    start = last
}, 1000)
export default class extends State {
    init() {
        this.stage.backgroundColor = '#30c6f5'
        this.physics.startSystem(Physics.ARCADE)
    }
    preload() {
        this.logo = new LogoSprite({
            game: this,
            x: 200,
            y: 200,
            asset: 'logo'
        })
        this.logo.anchor.setTo(0.5)

        this.physics.arcade.enable(this.logo)
        this.logo.body.velocity.setTo(400, 400)
        this.logo.body.collideWorldBounds = true
        this.logo.body.bounce.set(1)
    }
    create() {
        this.add.existing(this.logo)

        this.hello = this.add.text(this.world.centerX, this.world.centerY, 'Hello, world!', {
            font: '20px Arial',
            fill: '#000',
            align: 'center'
        })
        this.hello.anchor.setTo(0.5)

        setTimeout(() => {
            // this.state.start('Dashboard')
        }, 2000)
    }
    update() {
        this.logo.angle++
        game.physics.arcade.collide(this.logo)
    }
    render() {
        start = Date.now()
        this.game.debug.spriteInfo(this.logo, 20, 50)
        this.game.debug.text(`FPS: ${fps}`, 20, 25)
    }
}