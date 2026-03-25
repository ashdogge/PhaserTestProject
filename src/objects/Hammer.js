export default class Hammer extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "hammer");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive({ draggable: true });
    this.setImmovable(true);
    this.body.allowGravity = true;
    this.setCollideWorldBounds(true);
    this.setSize(81, 40);

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
