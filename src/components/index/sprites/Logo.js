import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({
        game,
        x,
        y,
        asset,
        frame
    }) {
        super(game, x, y, asset)
    }
}