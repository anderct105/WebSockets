import {loadLevel} from './loaders.js';
import {Matrix} from "./math.js";
import setupSockets from "./socket.io.js";


const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let offset = 0;

loadLevel().
then( level => {
    level.draw(context, offset);
    // código del ejercicio 6
    level.tiles.forEach((value, x, y) => console.log(x, y, value))

    // código del ejercicio 10
    window.addEventListener('keydown', e => {
        if (e.keyCode === 39) {offset += 1; level.draw(context, offset)}
        else if (e.keyCode === 37) {offset -= 1; level.draw(context, offset)}
    })
});

window.onload = setupSockets;

