import {
    State
} from 'phaser'
import Sprite from './../sprites/Logo'

let start = Date.now()
export default class extends State {
    init() {
        this.stage.backgroundColor = '#30c6f5'
    }
    preload() {
        this.dashboard = new Sprite({
            game: this,
            x: 0,
            y: 0,
            asset: 'dashboard'
        })
        this.dashboard.scale.set(375/1000)

    }
    create() {
        this.add.existing(this.dashboard)

        this.fps = this.add.text(20, 10, 'FPS: 0', {
            font: '20px Arial',
            fill: '#000',
            align: 'center'
        })
    }
    update() {
        const fps = parseInt(1000 / (Date.now() - start))
        start = Date.now()
        this.fps.setText(`FPS: ${fps}`)
    }
    render(){
      this.game.debug.spriteInfo(this.dashboard, 20, 50)
    }
}