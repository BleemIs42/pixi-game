import {
    Application,
    Container,
    loader,
    Sprite,
    Spritesheet,
    Texture,
    extras
} from 'pixi.js'

let __game
let __assets = {}

const stateContainer = {
    __states: {},
    active: {
        name: '',
        state: null,
        update() {}
    },
    add(name, state) {
        if (this.__states[name]) console.warn(`${name} state has registered, please rename it`)
        this.__states[name] = state
    },
    start(name) {
        __game.stage.removeChildren()
        __game.ticker.remove(this.active.update, this.active.state)

        const ActiveState = this.__states[name]
        if(!ActiveState) throw new Error(`${name} state is not exist`)
        const activeState = new ActiveState()

        const update = () => {
            if(!activeState.__isCreated) return
            activeState.update()
        }
        __game.ticker.add(update)
        __game.stage.addChild(activeState)
        this.active.update = update
        this.active.state = activeState
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
        this.assets = __assets
        this.__isCreated = false

        this.rerender = () => {
            this.removeChildren()
            this.init()
            this.preload()
            this.create()
        }

        this.add = (name, parent) => {
            parent = parent || this
            if (typeof name === 'string') {
                const sprite = new Sprite(__assets[name].texture)
                parent.addChild(sprite)
                return sprite
            }
            parent.addChild(name)
            return name
        }
        this.remove = (child, parent) => {
            parent = parent || this
            parent.removeChild(child)
            return child
        }

        this.init()

        let __isLoaded = false
        const loaderAdd = loader.add
        loader.add = (name, path, option, cb) => {
            __isLoaded = true
            loaderAdd.call(loader, name, path, option, cb)
        }
        this.loader = loader

        this.preload()

        this.loader.load((loaders, resources) => {
            this.__isCreated = true
            __assets = Object.assign({}, __assets, resources)
            this.assets = __assets
            this.create(loaders, resources)
        })

        if(!__isLoaded) {
            this.create()
            this.__isCreated = true
        } 
        
    }
    init() {}
    preload() {}
    create(loaders, resources) {}
    update() {}
}

class AnimatedSprite {
    constructor(baseTexture, spriteSheetJson) {
        const spritesheet = new Spritesheet(baseTexture, spriteSheetJson)
        const frames = []
        spritesheet.parse(textures => {
            Object.keys(textures).forEach(key => frames.push(Texture.fromFrame(key)))
        })
        return new extras.AnimatedSprite(frames)
    }
}

export {
    Game,
    State,
    AnimatedSprite
}   