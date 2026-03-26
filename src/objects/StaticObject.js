export default class StaticObject extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, sizeX, sizeY) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.body.allowGravity = false;
    this.setCollideWorldBounds(true);
    this.setSize(sizeX, sizeY);
  }
}
