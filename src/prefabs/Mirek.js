// Mirek prefab
class Mirek extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyLEFT, keyRIGHT, keyUPPER, keyDOWN) {
        super(scene, x, y, texture, frame);

        // track Mirek status...  Depends on how long each animation might be?
        this.isJumping = false;
        this.isSliding = false;
        this.isPunching = false;
        this.isDodging = false;

        /* TODO: MIREK SFX 
            this.sfxPunch = 
            this.sfxJump (?) =
            this.sfxSlide =
            this.sfxDodge =
            this.KO =      
        */
       
        
       this.keyLft = keyLEFT;
       this.keyRht = keyRIGHT;
       this.keyUp = keyUPPER;
       this.keyDown = keyDOWN;
    }

    update() {
           // if statements for each action
        if (Phaser.Input.Keyboard.JustDown(this.keyLft) && !this.isJumping && !this.isSliding && !this.isPunching && !this.isDodging) {
            this.isDodging = true;
            // ***********PERHAPS USE ONE-SHOT TIMER AS A COOLDOWN?  NEED TO KNOW FRAMES*****************
            // this.sfxDodge.play();
        }
       if (Phaser.Input.Keyboard.JustDown(this.keyRht) && !this.isJumping && !this.isSliding && !this.isPunching && !this.isDodging) {
            this.isPunch = true;
            // ***********PERHAPS USE ONE-SHOT TIMER AS A COOLDOWN?  NEED TO KNOW FRAMES*****************
            // this.sfxDodge.play();
       }
       if (Phaser.Input.Keyboard.JustDown(this.keyUp) && !this.isJumping && !this.isSliding && !this.isPunching && !this.isDodging) {
            this.isJumping = true;
            // ***********PERHAPS USE ONE-SHOT TIMER AS A COOLDOWN?  NEED TO KNOW FRAMES*****************
            // this.sfxDodge.play();
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyDown) && !this.isJumping && !this.isSliding && !this.isPunching && !this.isDodging) {
            this.isSliding = true;
            // ***********PERHAPS USE ONE-SHOT TIMER AS A COOLDOWN? NEED TO KNOW FRAMES*****************
            // this.sfxDodge.play();
        }
    }
}