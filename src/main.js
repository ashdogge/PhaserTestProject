import "./style.css";
import Phaser from "phaser";
import Player from "./objects/Player";
import FallingObject from "./objects/FallingObject";
import ScoreManager from "./managers/ScoreManager";
import TimeManager from "./managers/TimeManager";
import UIManager from "./ui/UIManager";
const sizes = {
  width: 500,
  height: 500,
};

const speedDown = 300;

const gameStartDiv = document.querySelector("#gameStartDiv");
const gameStartBtn = document.querySelector("#gameStartBtn");
// const gameEndDiv = document.querySelector("#gameEndDiv");
// const gameWinLoseSpan = document.querySelector("#gameWinLoseSpan");
// const gameEndScoreSpan = document.querySelector("#gameEndScoreSpan");

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    //  [ ~~ Moved to ./objects/Player.js ~~]
    // // V Add player object
    // this.player;
    // // Cursor controls
    // this.cursor;
    // this.playerSpeed = speedDown + 50;
    //  [~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
    // [ ~~ Moved to ./objects/FallingObject.js ~~]
    // this.target;
    // [ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
    // Create a 'points' variable
    // [ ~~ Moved score management to ./managers/ScoreManager.js ~~ ]
    // this.points = 0;
    // this.textScore;
    // [ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ]
    this.textTime;
    this.timedEvent;
    this.remainingTime;
    this.coinMusic;
    this.backgroundMusic;
    this.emitter;
    this.toWin = 10;
  }
  preload() {
    // Preload assets
    this.load.image("bg", "/assets/bg.png");
    this.load.image("basket", "/assets/basket.png");
    this.load.image("apple", "/assets/apple.png");
    this.load.image("money", "/assets/money.png");
    // Music
    this.load.audio("bgMusic", "/assets/bgMusic.mp3");
    this.load.audio("coin", "/assets/coin.mp3");
  }

  create() {
    // Start game paused until 'start'
    this.scene.pause("scene-game");

    // Add coin sound + bgMusic
    this.coinMusic = this.sound.add("coin");
    // this.bgMusic = this.sound.add("bgMusic");
    // play bgMusic
    // this.bgMusic.play();
    // Add background
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    // // Add player, assign physics, add sprite, location to add, sprite asset name
    // this.player = this.physics.add.image(0, sizes.height - 50, "basket");

    // >> Instantiate a 'player' object from the player class <<
    this.player = new Player(this, 250, 450);
    this.target = new FallingObject(this, 0, 0, "apple");
    this.scoreManager = new ScoreManager(this);
    this.timeManager = new TimeManager(this, 3000, this.gameOver);
    // Set immovable and disallow gravity to keep from falling offscreen
    // this.player.setImmovable(true);
    // this.player.body.allowGravity = false;
    // this.player.setCollideWorldBounds(true);
    // Set offset so that it looks like the apple is falling INTO basket
    // this.player.setSize(80, 15).setOffset(10, 70);

    // this.target = this.physics.add.image(0, 0, "apple").setOrigin(0, 0);
    // // Keep the target from accelerating infinitely lol
    // this.target.setMaxVelocity(0, speedDown);

    this.physics.add.overlap(
      this.target,
      this.player,
      this.targetHit,
      null,
      this,
    );

    this.cursor = this.input.keyboard.createCursorKeys();

    // this.textScore = this.add.text(sizes.width - 120, 10, "Score:0", {
    //   font: "25px Arial",
    //   fill: "#000000",
    // });
    // this.textTime = this.add.text(10, 10, "Remaining Time: 00", {
    //   font: "25px Arial",
    //   fill: "#000000",
    // });
    // create timer
    // this.timedEvent = this.time.delayedCall(30000, this.gameOver, [], this);

    this.emitter = this.add.particles(0, 0, "money", {
      speed: 100,
      gravityY: speedDown - 200,
      scale: 0.04,
      duration: 100,
      emitting: false,
    });
    this.emitter.startFollow(
      this.player,
      this.player.width / 4,
      this.player.height / 4,
      true,
    );
  }

  update() {
    this.player.move(this.cursor, 350);
    // [ ~~ Moved to ./managers/TimeManager.js ~~]
    // // Timer
    // this.remainingTime = this.timedEvent.getRemainingSeconds();
    // this.textTime.setText(
    //   `Remaining Time: ${Math.round(this.remainingTime.toString())}`,
    // );
    // [ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ]

    this.timeManager.update();

    if (this.target.y >= sizes.height) {
      this.target.respawn(sizes.height);
    }

    // const { left, right } = this.cursor;
    // // If left is down, set velocity X - at playerSpeed
    // if (left.isDown) {
    //   this.player.setVelocityX(-this.playerSpeed);
    // } else if (right.isDown) {
    //   this.player.setVelocityX(this.playerSpeed);
    // } else {
    //   this.player.setVelocityX(0);
    // }
  }

  // Function for getting a random X coord to respawn apple
  getRandomX() {
    return Math.floor(Math.random() * 480);
  }
  // Function for tracking when target is hit
  targetHit() {
    this.coinMusic.play();
    this.target.respawn(500);
    this.emitter.start();
    this.scoreManager.addPoint();
    // this.points++;
    // console.log(this.points);
    // this.textScore.setText(`Score: ${this.points}`);
  }

  gameOver() {
    this.sys.game.destroy(true);
    UIManager.ShowGameOver(
      this.scoreManager.points,
      this.scoreManager.points >= this.toWin,
    );
    // if (this.points >= 10) {
    //   gameEndScoreSpan.textContent = this.points;
    //   gameWinLoseSpan.textContent = "Win!";
    // } else {
    //   gameEndDiv.style.display = "flex";
    //   gameEndScoreSpan.textContent = this.points;
    //   gameWinLoseSpan.textContent = "lose!";
    // }
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

gameStartBtn.addEventListener("click", () => {
  gameStartDiv.style.display = "none";
  game.scene.resume("scene-game");
});
