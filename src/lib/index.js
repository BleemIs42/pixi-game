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
let __assets = Object.create(null)

const stateContainer = {
    __states: Object.create(null),
    active: {
        name: '',
        state: Object.create(null),
        update: null
    },
    add(name, state) {
        if (this.__states[name]) console.warn(`${name} state has registered, please rename it`)
        this.__states[name] = state
    },
    start(name) {
        // Use asyn resolve ticker update fn chain order
        setTimeout(() => {
            if(this.active.update) __game.ticker.remove(this.active.update)

            if(this.active.state.parent) __game.stage.removeChild(this.active.state)

            const ActiveState = this.__states[name]
            if (!ActiveState) throw new Error(`${name} state is not exist`)

            const activeState = new ActiveState()
            __game.stage.addChildAt(activeState, 0)

            const update = () => {
                if (!activeState.__isCreated) return
                activeState.update()
            }
            __game.ticker.add(update)
            
            this.active.name = name
            this.active.state = activeState
            this.active.update = update

        })
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

        let __hasResourceNeedLoade = false
        const loaderAdd = loader.add
        loader.add = (name, path, option, cb) => {
            __hasResourceNeedLoade = true
            loaderAdd.call(loader, name, path, option, cb)
        }
        this.loader = loader

        this.preload()

        if (__hasResourceNeedLoade) {
            this.loader.load((loaders, resources) => {
                this.__isCreated = true
                __assets = Object.assign({}, __assets, resources)
                this.assets = __assets
                this.create(loaders, resources)
            })
        }

        if (!__hasResourceNeedLoade) {
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