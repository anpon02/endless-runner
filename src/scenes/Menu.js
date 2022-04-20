class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        this.load.image('menu', './assets/menu.png');
    }

    create() {
        //display menu sprite
        this.TitleScreen = this.add.tileSprite(0, 0, 1280, 960, 'menu').setOrigin(0, 0);

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('tutorialScene');
        }
    }
  }