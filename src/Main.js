/*
Made by: 
Vincent (Tatum) Going
Ankie Pon
Giovanni Smith
Kennedy Thomas

Game Title: Run, Mirek, Run!

Date Completed: May 2, 2022

Programming Brag: Instead of doing the easy thing and using Arcade Physics Vincent went big mode and implimented a unique method of
deploying obstacles randomly and tracking collisions. Ankie also implimented a score tracking system that goes kinda crazy. 

Visual Style Brag: Our boy Giovanni made some absolutely banging tunes for this game and we are so proud of him. We also
are super proud of Kennedy's animations, they look really good and do our boy Mirek justice. Overall we are happy with 
what we accomplished visually and think our visual style compliments the game's lighthearted aesthetic. (playtesters agree!)
*/


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false
        }
    },

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