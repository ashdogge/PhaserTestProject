export default class MoveableObject extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, sizeX, sizeY) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive({ draggable: true });
    this.setImmovable(true);
    this.body.allowGravity = true;
    this.setCollideWorldBounds(true);
    this.setSize(sizeX, sizeY);

    // TODO: Make 'draggable' interactive items their own class
    this.on("dragstart", () => {
      this.body.moves = false; // Disable physics updates
    });
    this.on("drag", (pointer, dragX, dragY) => {
      this.setPosition(dragX, dragY);
    });
    this.on("dragend", () => {
      this.body.moves = true; // Re-enable physics when dropped
      // this.body.setVelocity(0); // Optional: stop it from "snapping" away
    });
  }
}
