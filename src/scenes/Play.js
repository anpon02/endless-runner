class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
      this.load.image('backgroundtile', './assets/backgroundtile.png');
      this.load.image('foregroundtile', './assets/foregroundtile.png');

    }
    
    create() {
      //speed will be updated over time to make the game more challenging
      this.speed= 2;
      //create backgrounds
      this.backgroundsprite = this.add.tileSprite(0, 0, gamewidth, gameheight, 'backgroundtile').setOrigin(0, 0);
      this.foregroundtile = this.add.tileSprite(0, gameheight-336, 640, 336, 'foregroundtile').setOrigin(0, 0);
    }

    update() {
      this.backgroundsprite.tilePositionX += this.speed/4;
      this.foregroundtile.tilePositionX += this.speed;

    }
  }