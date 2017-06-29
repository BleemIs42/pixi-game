import {
    Game,
    State
} from './game.js'

import logo from 'assets/logo.png'

class Boot extends State {
    init() {
        console.log('Boot init')
    }
    preload() {
        console.log('Boot preload')
        this.loader.add('logo', logo)
        // this.loader.load((loaders, resources)=>{
        //     this.addChild(resources.logo)
        // })
    }
    create() {
        console.log('Boot create')

        let basicText = new PIXI.Text('Boot text in pixi')
        this.add(basicText)
        this.add('logo')

        setTimeout(() => {
            this.state.start('Loading')
        }, 3000)
    }
    update() {
        console.log('Boot update')
        
    }
}

let count = 0
class Loading extends State {
    init() {
        console.log('Loading init')
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
        console.log('Loading update')
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
    }
}

const app = new App()
document.body.appendChild(app.view)