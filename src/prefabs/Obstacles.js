class Obstacles extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, reactionKey) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        
        this.reactionKey= reactionKey;
    }

    update() {
         
    }

    reset() {
        
    }
}