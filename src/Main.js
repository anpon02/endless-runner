let config = {
    type: Phaser.CANVAS,
    width: 1280/2,
    height: 960/2,
    scene: [ Menu, Play]
}

//game declaration
let game = new Phaser.Game(config);

//reserve key vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;

let gamewidth= game.config.width;
let gameheight= game.config.height;
let borderUISize= game.config.height / 15;
let borderPadding = borderUISize / 3;

/*
Menu screen

preload menu sprite;
preload tutorial sprite;

if (spacebar == pressed) {
    update() switch sprites;
}
*/