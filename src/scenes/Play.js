class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        this.load.image('backgroundtile', './assets/backgroundtile.png');
    }
    
    create() {
        this.backgroundsprite = this.add.tileSprite(0, 0, 1280, 960, 'backgroundtile').setOrigin(0, 0);
    }
  }