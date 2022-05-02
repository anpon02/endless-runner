class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        this.load.image('menu', './assets/menu.png');
        this.load.image('tutorial', './assets/tutorial.png');

        //audio files
        this.load.audio('sfx_punch', './assets/sfx_punch.mp3');
        this.load.audio('sfx_whiff', './assets/sfx_whiff.mp3');
        this.load.audio('sfx_slide', './assets/sfx_slide.mp3');
        this.load.audio('bgm_runMirek', './assets/RunMirek!.mp3');
        this.load.audio('sfx_flutter', './assets/sfx_flutter.mp3');
        this.load.audio('sfx_spacebar', './assets/sfx_spacebar.wav');
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
            this.sound.play('sfx_spacebar');
            
        }
        //if tutorial screen is showing check
        else if(this.tutorialDisplayed && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log("tutorial transition");
            this.sound.play('sfx_spacebar');
            this.scene.start('playScene');
        }      
    }
  }