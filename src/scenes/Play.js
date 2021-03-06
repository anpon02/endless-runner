class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
      this.load.image('backTrees', './assets/backTrees.png');
      this.load.image('frontTrees', './assets/frontTrees.png');
      //this.load.image('mirek', './assets/mirek.png'); //replaced by MirekRunning
      this.load.spritesheet('MirekRun', './assets/MirekRunSpritesheet.png', {frameWidth: 123, frameHeight: 164, startFrame: 0, endFrame: 3});
      //this.load.image('mirekJumping', './assets/mirekJumping.png');
      this.load.spritesheet('MirekJump', './assets/MirekJumpingSpritesheet.png', {frameWidth: 123, frameHeight: 164, startFrame: 0, endFrame: 6});
      // this.load.image('mirekDucking', './assets/mirekDucking.png');
      this.load.spritesheet('MirekDuck', './assets/MirekDuckSpritesheet.png', {frameWidth: 123, frameHeight: 164, startFrame: 0, endFrame: 3});
      //this.load.image('mirekPunching', './assets/mirekPunching.png');
      this.load.spritesheet('MirekPunch', './assets/MirekPunchSpritesheet.png', {frameWidth: 123, frameHeight: 164, startFrame: 0, endFrame: 3});
      //this.load.image('mirekDodging', './assets/mirekDodging.png');
      this.load.spritesheet('MirekDodge', './assets/MirekDodgeSpritesheet.png', {frameWidth: 123, frameHeight: 164, startFrame: 0, endFrame: 3});

      this.load.image('gameOver', './assets/gameover.png');

      this.load.image('car', './assets/car.png');
      this.load.image('branch', './assets/branch.png');
      this.load.image('sammy', './assets/sammy.png');
      this.load.image('slug', './assets/slug.png')

    }
    
    create() {
      //animation config
      this.anims.create({
        key: 'MirekRun',
        frames: this.anims.generateFrameNumbers('MirekRun', {start: 0, end: 3, first: 0}), frameRate: 6
      });

      this.anims.create({
        key: 'MirekJump',
        frames: this.anims.generateFrameNumbers('MirekJump', {start: 0, end: 3, first: 0}), frameRate: 12
      });

      this.anims.create({
        key: 'MirekDuck',
        frames: this.anims.generateFrameNumbers('MirekDuck', {start: 0, end: 3, first: 0}), frameRate: 6
      });
      
      this.anims.create({
        key: 'MirekPunch',
        frames: this.anims.generateFrameNumbers('MirekPunch', {start: 0, end: 3, first: 0}), frameRate: 6
      });

      this.anims.create({
        key: 'MirekDodge',
        frames: this.anims.generateFrameNumbers('MirekDodge', {start: 0, end: 3, first: 0}), frameRate: 6
      });
    

      //define keys
      this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

      //scorekeeping
      this.highscore = 0;
      
      //speed will be updated over time to make the game more challenging
      this.speed= 2;
      
      //create backgrounds
      this.backgroundsprite = this.add.tileSprite(0, 0, gamewidth, gameheight, 'backTrees').setOrigin(0, 0);
      this.foregroundtile = this.add.tileSprite(0, 0, gamewidth, gameheight, 'frontTrees').setOrigin(0, 0);

      //display score
      this.displayscore = this.add.text(16, 16, 'score: ', { fontSize: '32px', fill: '#000' });
      
      //place Mirek
      this.Mirek = this.add.sprite(game.config.width/5.5, game.config.height/1.6 - borderUISize - borderPadding,'MirekRun').setOrigin(0.5, 0);

      //add alt animations
      this.MirekJumping = this.add.sprite(game.config.width/5.5, game.config.height/1.6 - borderUISize - borderPadding,  'MirekJump').setOrigin(0.5, 0);
      this.MirekJumping.alpha=0;

      this.MirekDucking = this.add.sprite(game.config.width/5.5, game.config.height/1.6 - borderUISize - borderPadding,  'mirekDucking').setOrigin(0.5, 0);
      this.MirekDucking.alpha=0;

      this.MirekPunching = this.add.sprite(game.config.width/5.5, game.config.height/1.6 - borderUISize - borderPadding,  'mirekPunching').setOrigin(0.5, 0);
      this.MirekPunching.alpha=0;
      
      this.MirekDodging = this.add.sprite(game.config.width/5.5, game.config.height/1.6 - borderUISize - borderPadding,  'mirekDodging').setOrigin(0.5, 0);
      this.MirekDodging.alpha=0;

      //place obstacles
      this.car= new Obstacles(this, game.config.width, game.config.height/1.3  - borderUISize - borderPadding, 'car', 0, 'Car').setOrigin(0,0);
      console.log("CAR PLACED");

      this.branch= new Obstacles(this, game.config.width, game.config.height/1.5  - borderUISize - borderPadding, 'branch', 0, 'Branch').setOrigin(0,0);
      console.log("branch PLACED");

      this.sammy= new Obstacles(this, game.config.width, game.config.height/1.4  - borderUISize - borderPadding, 'sammy', 0, 'Sammy').setOrigin(0,0);
      console.log("sammy PLACED");

      this.slug= new Obstacles(this, game.config.width, game.config.height/1.2  - borderUISize - borderPadding, 'slug', 0, 'Slug').setOrigin(0,0);
      console.log("slug PLACED");

      //game over screen
      this.gameOverscreen = this.add.tileSprite(0, 0, gamewidth, gameheight, 'gameOver').setOrigin(0, 0);
      this.gameOverscreen.alpha = 0;
      this.gameoverDisplayed = false;

      //game over screen score display
      this.gameoverscore = this.add.text(16, 240, 'score: ', { fontSize: '32px', fill: '#000' });
      this.gameoverscore.alpha = 0;

      //define vars
      this.isJumping= false;
      this.isDucking= false;
      this.isPunching= false;
      this.isDodging=false;

      // Timed car spawning event
      this.carSpawnEvent = this.time.addEvent({delay: 5000, callback: () => { this.randNum= Math.floor(Math.random()*4);
        if(this.randNum == 0){
          this.car.go();
        }
        if(this.randNum == 1 ){
          this.branch.go();
        }
        if(this.randNum == 2){
          this.sammy.go();
        }
        if(this.randNum == 3){
          this.slug.go();
        }
  
        console.log("OBJ DEPLOYED:" + this.randNum);
      }, callbackScope: this, loop: true});

      //Timed speed increase event
      this.speedUp = this.time.addEvent({delay: 10000, callback: () => {     
        this.speed+= 1;
        if(this.speed< 16){
          this.car.updateSpeed(this.speed);
          this.branch.updateSpeed(this.speed);
          this.sammy.updateSpeed(this.speed);
          this.slug.updateSpeed(this.speed);
        }}, callbackScope: this, loop: true});

      //game over flag
      this.gameOver = false;

      this.countdown = 3000;

      //looping bgm
      this.bgMusic = this.sound.add('bgm_runMirek');
      this.bgMusic.loop = true;
      this.bgMusic.volume = .5;
      this.bgMusic.play();

      //looping jump/fly
      this.flutter = this.sound.add('sfx_flutter');
      this.flutter.loop = true;
      this.flutter.volume = .3;

      this.gameoverSFX = 0;

      this.whiff = this.sound.add('sfx_whiff');
      this.whiff.volume = 5; 

      this.GOSFX = this.sound.add('sfx_gameover1');
      this.GOSFX.volume = .5;
    }


    update() {
      this.backgroundsprite.tilePositionX += this.speed/4;
      this.foregroundtile.tilePositionX += this.speed;

      this.car.update();
      this.branch.update();
      this.sammy.update();
      this.slug.update();

      if(this.gameOver && this.gameoverDisplayed && Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
        this.scene.start('menuScene')
      }

      if(!this.gameOver) {
        this.Mirek.anims.play('MirekRun', 1, true);
        this.MirekJumping.anims.play('MirekJump', 1, true);
        this.MirekDucking.anims.play('MirekDuck', 1, true);
        this.MirekPunching.anims.play('MirekPunch', 1, true);
        this.MirekDodging.anims.play('MirekDodge', 1, true);
        this.countdown -= 250;
      }

      //scorekeeping
      if (this.countdown <= 0) {
        this.highscore += 1;
        this.displayscore.setText('score: ' + this.highscore);
        this.countdown = 3000;
      }
      

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

        //play sfx 
        this.flutter.play();
      }

      //jump to run transition
      if(Phaser.Input.Keyboard.JustUp(this.keyUP) && this.isJumping){
        this.Mirek.alpha= 1;
        this.MirekJumping.alpha=0;
        this.isJumping= false;
        this.flutter.stop();
      }

      if (Phaser.Input.Keyboard.JustUp(this.keyUP)){
        this.flutter.stop();
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

        this.sound.play('sfx_slide');
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

        this.sound.play('sfx_punch');
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

        this.whiff.play();
      }

      //dodge to run transition
      if(Phaser.Input.Keyboard.JustUp(this.keyLEFT) && this.isDodging){
        this.Mirek.alpha= 1;
        this.MirekDodging.alpha=0;
        this.isDodging= false;
      }
      
      if (this.checkCollision(this.Mirek, this.car) || this.checkCollision(this.Mirek, this.branch) || this.checkCollision(this.Mirek, this.slug) || this.checkCollision(this.Mirek, this.sammy)) {
        console.log('shmack');
        this.bgMusic.stop();
        if (this.gameoverSFX != 1){
          this.GOSFX.play();
          this.gameoverSFX = 1;
          this.gameover();
        }
      }

      
    }

    // Collision Checking
    checkCollision(Mirek, Obstacle) {
      //check if Obstacle is Car
      if(Obstacle.obstacleType == 'Car'){ 
        if (Mirek.x < Obstacle.x + Obstacle.width && Mirek.x + .2 * Mirek.width > Obstacle.x && Mirek.y < Obstacle.y + Obstacle.height && Mirek.height + Mirek.y > Obstacle.y && !this.isJumping) {
          return true;
        } else {
          return false;
        }
      }

      //check if obstacle is Branch
      if(Obstacle.obstacleType == 'Branch'){ 
        if (Mirek.x < Obstacle.x + Obstacle.width && Mirek.x + .2 * Mirek.width > Obstacle.x && Mirek.y < Obstacle.y + Obstacle.height && Mirek.height + Mirek.y > Obstacle.y && !this.isDucking) {
          return true;
        } else {
          return false;
        }
      }
      //check if obstacle is Sammy
      if(Obstacle.obstacleType == 'Sammy'){ 
        if (Mirek.x < Obstacle.x + Obstacle.width && Mirek.x + .2 * Mirek.width > Obstacle.x && Mirek.y < Obstacle.y + Obstacle.height && Mirek.height + Mirek.y > Obstacle.y && !this.isPunching) {
          return true;
        } else {
          return false;
        }
      }
      //check if obstacle is Slug
      if(Obstacle.obstacleType == 'Slug'){ 
        if (Mirek.x < Obstacle.x + Obstacle.width && Mirek.x + .2 * Mirek.width > Obstacle.x && Mirek.y < Obstacle.y + Obstacle.height && Mirek.height + Mirek.y > Obstacle.y && !this.isDodging) {
          return true;
        } else {
          return false;
        }
      }
    }
    
    onEvent(event){

      this.randNum= Math.floor(Math.random()*4);
      if(this.randNum == 0){
        this.car.go();
      }
      if(this.randNum == 1 ){
        this.branch.go();
      }
      if(this.randNum == 2){
        this.sammy.go();
      }
      if(this.randNum == 3){
        this.slug.go();
      }

      console.log("OBJ DEPLOYED:" + this.randNum);
    }

    speedUp(){
      if(!this.gameOver) {
        this.speed+= 1;
        if(this.speed< 16){
          this.car.updateSpeed(this.speed);
          this.branch.updateSpeed(this.speed);
          this.sammy.updateSpeed(this.speed);
          this.slug.updateSpeed(this.speed);
        }
      }
    }

    gameover(){
      this.gameOver = true;
      console.log("game over, switching back to menu");
      this.carSpawnEvent.remove();
      this.speedUp.remove();
      // this.scene.start('menuScene');
      this.speed = 0;
      this.gameoverscore.setText('score: ' + this.highscore);
      this.gameOverscreen.alpha = 1;
      this.gameoverscore.alpha = 1;
      this.gameoverDisplayed = true;
    }
  }