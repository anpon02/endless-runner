let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

//game declaration
let game = new Phaser.Game(config);

//reserve key vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;

/*
Menu screen

preload menu sprite;
preload tutorial sprite;

if (spacebar == pressed) {
    update() switch sprites;
}
*/