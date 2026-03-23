export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "basket");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.body.allowGravity = false;
    this.setCollideWorldBounds(true);
    this.setSize(80, 15).setOffset(10, 70);
  }

  move(cursor, speed) {
    if (cursor.left.isDown) {
      this.setVelocityX(-speed);
    } else if (cursor.right.isDown) {
      this.setVelocityX(speed);
    } else {
      this.setVelocityX(0);
    }
  }
}
