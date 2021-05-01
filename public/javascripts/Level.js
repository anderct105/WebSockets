import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.tiles = new Matrix();
        this.background = null;
    }

    draw(context, offset){
        console.log(this.background)
        context.drawImage(this.background, offset, 0, 600, 600, 0, 0, 600, 600)
    }
}

