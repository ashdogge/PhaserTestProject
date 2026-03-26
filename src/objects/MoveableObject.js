export default class MoveableObject extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, sizeX, sizeY) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive({ draggable: true });

    this.body.allowGravity = true;
    this.setCollideWorldBounds(true);
    this.setSize(sizeX, sizeY);
    this.setBounce(0.5);

    // this.on("dragstart", () => {
    //   this.body.moves = false; // Disable physics updates
    // });
    this.on("drag", (pointer) => {
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        pointer.x,
        pointer.y,
      );
      this.setBounce(0.0);
      // Only move if the cursor is at least 10 pixels away
      if (distance > 10) {
        this.scene.physics.moveTo(this, pointer.x, pointer.y, 1000);
      } else {
        // Stop the hammer if it's close enough to the cursor
        this.body.setVelocity(0);
      }
    });
    this.on("dragend", () => {
      this.body.setVelocity(0); // Stop it from sliding when released
      this.body.setBounce(0.5);
    });
  }
}
