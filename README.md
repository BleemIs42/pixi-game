# Pixi-game

# API
1. Class
    - Game: extends from class Application
        - Members: 
            - state
                - Methods:
                    - add(name, stage): register a stage to stage container
                    - start(name): switch a new stage
    - Stage: extends from class Container
        - Members: 
            - game: the instance of class Game 
            - stage: the renderer of game
            - state: the same as class Game state
        - Methods: 
            - loader: PIXI.loader
            - add: alias of addChild
            - init
            - preload: load some resources
            - create: after all resources loaded, add displayObject to stage
            - update: update displayObject status


# Example
```js
import {
    Game,
    State
} from 'lib'

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
        this.add('logo')

        setTimeout(() => {
            this.state.start('Loading')
        }, 3000)
    }
    update() {
        console.log('Boot update')

    }
}

class Loading extends State {
    init() {
        console.log('Loading init')
        this.stage.backgroundColor = 0xff0000
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
```
