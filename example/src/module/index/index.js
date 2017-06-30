import {
    Game,
    State
} from 'pixi-game'

import logo from 'assets/logo.png'

class Boot extends State {
    init() {
        console.log('Boot init')
    }
    preload() {
        console.log('Boot preload')
        this.loader.add('logo', logo)
    }
    create() {
        console.log('Boot create')

        let basicText = new PIXI.Text('Boot text in pixi')
        this.add(basicText)

        this.logo = this.add('logo')
        this.logo.x = 100
        this.logo.y = 20

        setTimeout(() => {
            this.state.start('Loading')
        }, 3000)
    }
    update() {
        // console.log('Boot update')

    }
}

class Loading extends State {
    init() {
        console.log('Loading init')
        this.stage.backgroundColor = 0xff0000
        // this.stage.width = 800
        // this.stage.height = 600
        this.stage.resize(800, 600)
        this.stage.autoResizeboolean = true
    }
    preload() {
        console.log('Loading preload')
    }
    create() {
        console.log('Loading create')
        let basicText = new PIXI.Text('Loading text in pixi')
        this.add(basicText)
    }
    update() {
        // console.log('Loading update')
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
        console.log(this)
    }
}

const app = new App()
document.body.appendChild(app.view)