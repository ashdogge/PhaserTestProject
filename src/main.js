import "./style.css";
import Phaser from "phaser";

const sizes = {
  width: 500,
  height: 500,
};

const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    // V Add player object
    this.player;
    // Cursor controls
    this.cursor;
    this.playerSpeed = speedDown + 50;
  }
  preload() {
    // Preload assets
    this.load.image("bg", "/assets/bg.png");
    this.load.image("basket", "/assets/basket.png");
  }

  create() {
    // Add background
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    // Add player, assign physics, add sprite, location to add, sprite asset name
    this.player = this.physics.add.image(0, sizes.height - 50, "basket");
    // Set immovable and disallow gravity to keep from falling offscreen
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update() {
    const { left, right } = this.cursor;
    // If left is down, set velocity X - at playerSpeed
    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
