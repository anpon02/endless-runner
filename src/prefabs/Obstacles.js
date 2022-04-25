class Obstacles extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, reactionKey) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.originalX= this.x;
        this.reactionKey= reactionKey;
        this.moveSpeed = 4;
        this.isGoing= false;
    }

    update() {
        if(this.isGoing){
            this.x -= this.moveSpeed;
        }
         

         // despawn object if off-screen, no leaks!
         if (this.x <= 0 - this.width){
            this.x= this.originalX;
            this.isGoing= false;
         }
    }

    go(){
        this.isGoing= true;
    }


    reset() {
        
    }
}