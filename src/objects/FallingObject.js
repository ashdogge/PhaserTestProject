export default class FallingObject extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setMaxVelocity(0, 300);
  }

  respawn(width) {
    this.setY(0);
    this.setX(Math.floor(Math.random() * width));
  }
}
