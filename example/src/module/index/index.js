import {
    Game,
    State
} from '../../../../src/lib/index.js'
import { Text } from 'pixi.js'

import logo from 'assets/logo.png'

class Boot extends State {
    init() {
        console.log('Boot init')
        const loading = new Text(
            'loading...', {
                fontSize: 50,
                fill: 0xff0f0f
            }
        )
        // loading.position.set(this.stage.width / 2, this.stage.height / 2)
        // loading.anchor.set(0.5)
        // this.loading = loading
        this.add(loading)
    }
    preload() {
        console.log('Boot preload')
        // this.loader.add('logo', logo)
    }
    create() {
        console.log('Boot create')

        // this.logo = this.add('logo')
        // this.logo.x = 100
        // this.logo.y = 20

        // setTimeout(() => {
        this.state.start('Loading')
        // }, 3000)
    }
    update() {
        console.log('Boot update')

    }
}

let angle = 0
class Loading extends State {
    init() {
        console.log('Loading init')
        // this.stage.backgroundColor = 0xff0000
        // this.stage.width = 800
        // this.stage.height = 600
        // this.stage.resize(800, 600)
        // this.stage.autoResizeboolean = true
    }
    preload() {
        console.log('Loading preload')
        this.loader.add('logo2', logo)
    }
    create() {
        console.log('Loading create')
        this.basicText = new PIXI.Text('Loading text in pixi')
        this.add(this.basicText)
    }
    update() {
        console.log('Loading update')
        // this.basicText.x += Math.cos(angle)
        // angle += 0.2
    }
}

const states = {
    Boot,
    Loading
}

class App extends Game {
    constructor() {
        super(400, 300, {
            backgroundColor: 0xeeeeee
        })

        Object.keys(states).forEach(state => this.state.add(state, states[state]))

        this.state.start('Boot')
        // this.state.start('Loading')
    }
}

const app = new App()
document.body.appendChild(app.view)