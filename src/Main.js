let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 960,
    scene: [ Menu, Play ]
}

//game declaration
let game = new Phaser.Game(config);

//reserve key vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;


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