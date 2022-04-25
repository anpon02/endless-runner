class Obstacles extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, reactionKey) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        
        this.reactionKey= reactionKey;
        this.moveSpeed = 3;
    }

    update() {
         this.x -= this.moveSpeed;

         // despawn object if off-screen, no leaks!
         if (this.x <= 0 - this.width){
            console.log('BEGONE')
            this.destroy();
         }
    }

    reset() {
        
    }
}