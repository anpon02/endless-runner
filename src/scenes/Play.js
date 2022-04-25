class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
      this.load.image('backgroundtile', './assets/backgroundtile.png');
      this.load.image('foregroundtile', './assets/foregroundtile.png');
      this.load.image('mirek', './assets/mirek.png');
      this.load.image('mirekJumping', './assets/mirekJumping.png');
      this.load.image('mirekDucking', './assets/mirekDucking.png');
      this.load.image('mirekPunching', './assets/mirekPunching.png');
      this.load.image('mirekDodging', './assets/mirekDodging.png');

      this.load.image('car', './assets/car.png');
      /*
      this.load.spritesheet(mirek runnin anim)
      this.load.spritesheet(mirek jumping anim)
      this.load.spritesheet(mirek punching anim)
      this.load.spritesheet(mirek ducking anim)
      */


    }
    
    create() {
      //define keys
      this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

      //speed will be updated over time to make the game more challenging
      this.speed= 2;
      
      //create backgrounds
      this.backgroundsprite = this.add.tileSprite(0, 0, gamewidth, gameheight, 'backgroundtile').setOrigin(0, 0);
      this.foregroundtile = this.add.tileSprite(0, gameheight-336, 640, 336, 'foregroundtile').setOrigin(0, 0);
      
      //place mirek running anim; place everything else set alpha to 1
      /*this.Mirek = new Mirek(this, game.config.width/5.5, game.config.height/1.5 - borderUISize - borderPadding, 'mirek', keyLEFT,
          keyRIGHT, keyUP, keyDOWN).setOrigin(0.5, 0);
      console.log("mirek placed"); 
      commented out because I think we can make the game work without a Mirek Class*/
      
      this.Mirek= this.add.sprite(game.config.width/5.5, game.config.height/1.5 - borderUISize - borderPadding,'mirek').setOrigin(0.5, 0);
      
      //add alt animations
      this.MirekJumping = this.add.sprite(game.config.width/5.5, game.config.height/1.5 - borderUISize - borderPadding,  'mirekJumping').setOrigin(0.5, 0);
      this.MirekJumping.alpha=0;

      this.MirekDucking = this.add.sprite(game.config.width/5.5, game.config.height/1.5 - borderUISize - borderPadding,  'mirekDucking').setOrigin(0.5, 0);
      this.MirekDucking.alpha=0;

      this.MirekPunching = this.add.sprite(game.config.width/5.5, game.config.height/1.5 - borderUISize - borderPadding,  'mirekPunching').setOrigin(0.5, 0);
      this.MirekPunching.alpha=0;
      
      this.MirekDodging = this.add.sprite(game.config.width/5.5, game.config.height/1.5 - borderUISize - borderPadding,  'mirekDodging').setOrigin(0.5, 0);
      this.MirekDodging.alpha=0;

      //place obstacles
      this.car= new Obstacles(this, game.config.width-100, game.config.height/1.4  - borderUISize - borderPadding, 'car', this.keyUP).setOrigin(0,0);
      console.log("CAR PLACED");

      //define vars
      this.isJumping= false;
      this.isDucking= false;
      this.isPunching= false;
      this.isDodging=false;

      // Timed car spawning event
      this.carSpawnEvent = this.time.addEvent({delay: 5000, callback: this.onEvent, callbackScope: this, loop: true});
    }

    update() {
      this.backgroundsprite.tilePositionX += this.speed/4;
      this.foregroundtile.tilePositionX += this.speed;

      this.car.update();

      //var summonobstacle = setInterval(this.onEvent, 5000);

      

      //jump
      if(Phaser.Input.Keyboard.JustDown(this.keyUP) && !Phaser.Input.Keyboard.JustDown(this.keyRIGHT) && !Phaser.Input.Keyboard.JustDown(this.keyLEFT) && !Phaser.Input.Keyboard.JustDown(this.keyDOWN)){
        this.Mirek.alpha= 0;
        this.MirekJumping.alpha=1;
        this.MirekDucking.alpha= 0;
        this.MirekPunching.alpha=0;
        this.MirekDodging.alpha=0;

        //only jumping
        this.isJumping= true;
        this.isDucking= false;
        this.isPunching= false;
        this.isDodging=false;
      }

      //jump to run transition
      if(Phaser.Input.Keyboard.JustUp(this.keyUP) && this.isJumping){
        this.Mirek.alpha= 1;
        this.MirekJumping.alpha=0;
        this.isJumping= false;
      }

      //duck
      if(Phaser.Input.Keyboard.JustDown(this.keyDOWN) && !Phaser.Input.Keyboard.JustDown(this.keyRIGHT) && !Phaser.Input.Keyboard.JustDown(this.keyLEFT) && !Phaser.Input.Keyboard.JustDown(this.keyUP)){
        this.Mirek.alpha= 0;
        this.MirekJumping.alpha=0;
        this.MirekDucking.alpha= 1;
        this.MirekPunching.alpha=0;
        this.MirekDodging.alpha=0;


        //only ducking
        this.isJumping= false;
        this.isDucking= true;
        this.isPunching= false;
        this.isDodging=false;
      }

      //dodge to run transition
      if(Phaser.Input.Keyboard.JustUp(this.keyDOWN) && this.isDucking){
        this.Mirek.alpha= 1;
        this.MirekDucking.alpha=0;
        this.isDucking= false;
      }

      //punch
      if(Phaser.Input.Keyboard.JustDown(this.keyRIGHT) && !Phaser.Input.Keyboard.JustDown(this.keyUP) && !Phaser.Input.Keyboard.JustDown(this.keyLEFT) && !Phaser.Input.Keyboard.JustDown(this.keyDOWN)){
        this.Mirek.alpha= 0;
        this.MirekJumping.alpha=0;
        this.MirekDucking.alpha= 0;
        this.MirekPunching.alpha=1;
        this.MirekDodging.alpha=0;

        //only punching
        this.isJumping= false;
        this.isDucking= false;
        this.isPunching= true;
        this.isDodging=false;
      }

      //punch to run transition
      if(Phaser.Input.Keyboard.JustUp(this.keyRIGHT) && this.isPunching){
        this.Mirek.alpha= 1;
        this.MirekPunching.alpha=0;
        this.isPunching= false;
      }

      //dodge
      if(Phaser.Input.Keyboard.JustDown(this.keyLEFT) && !Phaser.Input.Keyboard.JustDown(this.keyRIGHT) && !Phaser.Input.Keyboard.JustDown(this.keyDOWN) && !Phaser.Input.Keyboard.JustDown(this.keyUP)){
        this.Mirek.alpha= 0;
        this.MirekJumping.alpha=0;
        this.MirekDucking.alpha= 0;
        this.MirekPunching.alpha=0;
        this.MirekDodging.alpha=1;


        //only dodging
        this.isJumping= false;
        this.isDucking= false;
        this.isPunching= false;
        this.isDodging=true;
      }

      //dodge to run transition
      if(Phaser.Input.Keyboard.JustUp(this.keyLEFT) && this.isDodging){
        this.Mirek.alpha= 1;
        this.MirekDodging.alpha=0;
        this.isDodging= false;
      }
      
      if (this.checkCollision(this.Mirek, this.car)) {
        console.log('shmack')
        this.gameover();
      }
      
    }

    // Collision Checking
    checkCollision(Mirek, Obstacle) {
      if (Mirek.x < Obstacle.x + Obstacle.width && Mirek.x + Mirek.width > Obstacle.x && Mirek.y < Obstacle.y + Obstacle.height && Mirek.height + Mirek.y > Obstacle.y && !this.isJumping) {
        return true;
      } else {
        return false;
      }
    }
    
    onEvent(){
      this.car.go();
      console.log("CAR DEPLOYED");
    }

    gameover(){
      this.gameOver = true;
      console.log("game over, switching back to menu");
      this.scene.start('menuScene');
    }
  }