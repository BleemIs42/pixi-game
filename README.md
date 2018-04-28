# Pixi-game
> A library makes Pixi.js using easily.

# Install 
```bash
npm install pixi-game
# or
yarn add pixi-game
```

# Class
- [Game](https://github.com/Shafley/pixi-game/blob/master/README.md#game)
- [State](https://github.com/Shafley/pixi-game/blob/master/README.md#state)
- [AnimatedSprite](https://github.com/Shafley/pixi-game/blob/master/README.md#animatedsprite)

# Game
Extend from PIXI.Application.

## new Game(option)
## option: As same as option of PIXI.Application.
##### *Members*
- **state** `[Object]`
    - **__states** `[Object]` The container of all add state container.
    - **active** `[Object]`
        - **name** `[String]`
        - **state** `[Object]` Current running state, extends PIXI.Container.
        - **update** `[Function]` Current running function in PIXI.ticker.
    - **add** `[Function]`
        - @param **name** `[String]` State name.
        - @param **state** `[Object]` State extends PIXI.Container.
    - **start** `[Function]` Switch render a new state to stage.
        - @param **name** `[String]` State of state container.
##### *Example*
```js
import * as states from 'components/game'
class App extends Game {
    constructor() {
        super(400, 300, {
            backgroundColor: 0xeeeeee
        })

        Object.keys(states).forEach(state => this.state.add(state, states[state]))

        this.state.start('Boot')

        window.onresize = () =>{
            this.renderer.resize(800, 600)
            this.state.active.state.removeChildren()
            this.state.active.state.rerender()
        }
    }
}

window.game = new App()
document.body.appendChild(window.game.view)
```
---
# State
Extend from PIXI.Container

## new State()
##### *Members*      
- **game** `[Object]` The instance of Game
- **stage** `[Object]` Equal **renderer** which is the property of Game's instance.
- **state** `[Object]` As same as Game's state.
- **loader** `[Object]` PIXI.loader.
- **assets** `[Object]` All resource loaded use this.loader.add().
- **add** `[Function]`
    - @param **name** `[String | Object]` The loaded resource name or sprite.
- **init** `[Function]` Some init action.
- **preload** `[Function]` Use this.add function to preload resource.
- **create** `[Function]` After all resource loaded, create display Object.
- **update** `[Function]` After displayObjec created, update status.
- **rerener** `[Function]` Rerender all displayObject in stage.

##### *Example*
```js
import { State } from 'pixi-game'
import { Text } from 'pixi.js'
import logo from 'assets/logo.png'

let sY = angle = 0
export default class extends State {
    init() {
        this.stage.backgroundColor = 0xeeeeee

        const loading = new Text(
            'loading...',
            {
                fontSize: 50,
                fill: 0xff0f0f
            }
        )
        loading.position.set(this.stage.width / 2, this.stage.height / 2)
        loading.anchor.set(0.5)
        this.loading = loading
        this.add(loading)
    }
    preload() {
        this.loader.add('logo', logo)
        this.loader.onProgress.add(loader => {
            this.loading.text = `loading ${parseInt(loader.progress)}%`
            this.state.start('Home')
        })
    }
    create() {
        this.logo = this.add('logo')
        thi.logo.position.set(this.stage.width / 2, this.stage.height / 4)
        this.logo.anhor.set(0.5)
        sY = this.logo.y
    }
    update() {
        if(angle > Math.PI * 2) angle = 0
        this.logo.y = sY + Math.sin(angle)
        angle += 0.1
    }
}
```

---
# AnimatedSprite

## new AnimatedSprite(baseTexture, spriteSheetJson)
- @param **baseTexture** [Object] The instance of PIXI.BaseTexture.
- @param **spriteSheetJson** [Object] JSON hash, export from TexturePacker.
- @return **animatedSprite** [Object] An animated Sprite.

##### *Example* 
```js
import redpackJson from 'assets/redpack.json'
const redpack = new AnimatedSprite(this.assets.redpack.texture.baseTexture, redpackJson)
redpack.position.set(571, 255)
redpackX = redpack.x
redpack.animationSpeed = 0.05
redpack.play()
this.redpack = this.add(redpack, gift)
```

---
# Sample Example
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
        this.stage.resize(400, 300)
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

# License
 MIT
