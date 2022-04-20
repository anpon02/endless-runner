class Tutorial extends Phaser.Scene {
    constructor() {
      super("tutorialScene");
    }
    
    preload() {
        this.load.image('tutorial', './assets/tutorial.png');
    }

    create() {
        //display tutorial sprite
        this.TitleScreen = this.add.tileSprite(0, 0, 1280, 960, 'tutorial').setOrigin(0, 0);

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
  }