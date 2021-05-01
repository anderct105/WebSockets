import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js'
import {createBackgroundLayer} from './layers.js';

export function loadImage(url){
    // código del ejercicio 3
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image)
        });
        image.src = url
    });
}

function loadJSON(url){
    // código del ejercicio 2
    return fetch(url).then(r1 => r1.json())
}

function createTiles(level, backgrounds){
    // código del ejercicio 5
    for (var k = 0; k < backgrounds.length; k++) {
        for (var range = 0; range < backgrounds[k].ranges.length; range++) {
            for (var x = backgrounds[k].ranges[range][0]; x < backgrounds[k].ranges[range][1] + backgrounds[k].ranges[range][0]; x++) {
                for (var y = backgrounds[k].ranges[range][2]; y < backgrounds[k].ranges[range][2] + backgrounds[k].ranges[range][3]; y++) {
                    level.tiles.set(x, y, backgrounds[k].tile)
                }
            }
        }
    }
}

function loadSpriteSheet(){
    // código del ejercicio 4;
    return loadJSON('sprites/sprites.json')
        .then(sheetSpec => Promise.all([sheetSpec, loadImage(sheetSpec["imageURL"])]))
        .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(image, sheetSpec["tileW"], sheetSpec["tileH"])
            console.log(sheetSpec.tiles.values())
            for (var tile in sheetSpec.tiles) {
                sprites.defineTile(sheetSpec.tiles[tile].name, sheetSpec.tiles[tile].index[0], sheetSpec.tiles[tile].index[1])
            }
            return sprites
        });
}


export function loadLevel(){
    return loadJSON('levels/level.json') // qué tiles hay que poner y dónde dentro de este nivel
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(), // cargar imágenes de un spritesheet como sprites
        ]))
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            createTiles(level, levelSpec.backgrounds); // desplegar tiles en la estrucura Matrix
            const backgroundLayer = createBackgroundLayer(level, backgroundSprites); // cargar canvas
            level.background = backgroundLayer; // canvas buffer
            console.log(level)
            return level;
        });

}
