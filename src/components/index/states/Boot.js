import {
    State,
    ScaleManager
} from 'phaser'

import iLogo from 'assets/logo.png'
import iDashboard from 'assets/dashboard.gif'

export default class extends State {
    init() {
        this.stage.backgroundColor = '#EDEEC9'
    }

    preload() {
        this.loading = this.add.text(this.world.centerX, this.world.centerY, 'loading...', {
            font: '20px Arial',
            fill: '#000',
            align: 'center'
        })
        this.loading.anchor.setTo(0.5)

        this.load.image('logo', iLogo)
        this.load.image('dashboard', iDashboard)

    }
    create() {
        this.game.scale.scaleMode = ScaleManager.SHOW_ALL
        this.game.scale.pageAlignHorizontally = true
        this.game.scale.pageAlignVertically = true
        // this.game.scale.setScreenSize(true)

        this.state.start('Logo')
    }
    update() {
        this.loading.angle++
    }
}