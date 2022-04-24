class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
      this.load.image('backgroundtile', './assets/backgroundtile.png');
      this.load.image('foregroundtile', './assets/foregroundtile.png');
      this.load.image('mirek', './assets/mirek.png');
      /*
      this.load.spritesheet(mirek runnin anim)
      this.load.spritesheet(mirek jumping anim)
      this.load.spritesheet(mirek punching anim)
      this.load.spritesheet(mirek ducking anim)
      */


    }
    
    create() {
      //speed will be updated over time to make the game more challenging
      this.speed= 2;
      
      //create backgrounds
      this.backgroundsprite = this.add.tileSprite(0, 0, gamewidth, gameheight, 'backgroundtile').setOrigin(0, 0);
      this.foregroundtile = this.add.tileSprite(0, gameheight-336, 640, 336, 'foregroundtile').setOrigin(0, 0);

      //place mirek running anim; place everything else set alpha to 1
      this.Mirek = new Mirek(this, game.config.width/3.5, game.config.height/1.5 - borderUISize - borderPadding, 'mirek', keyLEFT,
          keyRIGHT, keyUP, keyDOWN).setOrigin(0.5, 0);
      console.log("mirek placed");

      //define keys
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
      this.backgroundsprite.tilePositionX += this.speed/4;
      this.foregroundtile.tilePositionX += this.speed;

      

    }
  }