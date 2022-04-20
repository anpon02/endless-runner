class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        this.load.image('menu', './assets/menu.png');
        this.load.image('tutorial', './assets/tutorial.png');

    }

    create() {
        this.tutorialDisplayed = false;
        //display menu sprite
        this.TitleScreen = this.add.tileSprite(0, 0, gamewidth, gameheight, 'menu').setOrigin(0, 0);
        //create and hide tutorial sprite
        this.TutorialScreen = this.add.tileSprite(0, 0, gamewidth, gameheight, 'tutorial').setOrigin(0, 0);
        this.TutorialScreen.alpha = 0;

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
       
        if(!this.tutorialDisplayed && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log("menu transition");
            //display tutorial, hide menu
            this.TutorialScreen.alpha= 1;
            this.TitleScreen.alpha= 0;
            this.tutorialDisplayed= true;
            console.log(this.tutorialDisplayed);
        }
        //if tutorial screen is showing check
        else if(this.tutorialDisplayed && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log("tutorial transition");
            this.scene.start('playScene');
        }      
    }
  }