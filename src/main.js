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
    this.target;
    // Create a 'points' variable
    this.points = 0;
    this.textScore;
    this.textTime;
  }
  preload() {
    // Preload assets
    this.load.image("bg", "/assets/bg.png");
    this.load.image("basket", "/assets/basket.png");
    this.load.image("apple", "/assets/apple.png");
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
    // Set offset so that it looks like the apple is falling INTO basket
    this.player.setSize(80, 15).setOffset(10, 70);

    this.target = this.physics.add.image(0, 0, "apple").setOrigin(0, 0);
    // Keep the target from accelerating infinitely lol
    this.target.setMaxVelocity(0, speedDown);

    this.physics.add.overlap(
      this.target,
      this.player,
      this.targetHit,
      null,
      this,
    );

    this.cursor = this.input.keyboard.createCursorKeys();

    this.textScore = this.add.text(sizes.width - 120, 10, "Score:0", {
      font: "25px Arial",
      fill: "#000000",
    });
    this.textTime = this.add.text(10, 10, "Remaining Time: 00", {
      font: "25px Arial",
      fill: "#000000",
    });
  }

  update() {
    if (this.target.y >= sizes.height) {
      this.target.setY(0);
      this.target.setX(this.getRandomX());
    }

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

  // Function for getting a random X coord to respawn apple
  getRandomX() {
    return Math.floor(Math.random() * 480);
  }
  // Function for tracking when target is hit
  targetHit() {
    this.target.setY(0);
    this.target.setX(this.getRandomX());
    this.points++;
    console.log(this.points);
    this.textScore.setText(`Score: ${this.points}`);
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
