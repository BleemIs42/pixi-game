import {
    Application,
    Container,
    loader,
    Sprite
} from 'pixi.js'

let __game
let __assets = {}

let stateContainer = {
    __states: {},
    __active: {
        state: null,
        update() {}
    },
    add(name, state) {
        if (this.__states[name]) console.warn(`${name} state has registered, please rename it`)
        this.__states[name] = state
    },
    start(name) {
        __game.stage.removeChildren()
        __game.ticker.remove(this.__active.update, this.__active.state)

        const ActiveState = this.__states[name]
        const activeState = new ActiveState()
        __game.ticker.add(activeState.update, activeState)
        __game.stage.addChild(activeState)
        this.__active.update = activeState.update
        this.__active.state = activeState
    }
}

class Game extends Application {
    constructor(...opt) {
        super(...opt)
        __game = this
        this.state = stateContainer
    }
}

class State extends Container {
    constructor() {
        super()
        this.game = __game
        this.stage = __game.renderer
        this.state = stateContainer

        let __hasLoad = false
        const loaderAdd = loader.add
        loader.add = (name, path, option, cb) => {
            __hasLoad = true
            loaderAdd.call(loader, name, path, option, cb)
        }
        this.loader = loader

        this.init()
        this.preload()

        this.loader.load((loaders, resources) => {
            __assets = Object.assign({}, __assets, resources)
            this.assets = __assets
            this.create(loaders, resources)
        })
        this.add = name => {
            let sprite
            if (typeof name === 'string') {
                sprite = new Sprite(__assets[name].texture)
                this.addChild(sprite)
                return sprite
            }
            this.addChild(name)
            return sprite
        }

        if(__hasLoad) return
        this.create()
    }
    init() {}
    preload() {}
    create(loaders, resources) {}
    update() {}
}

export {
    Game,
    State
}