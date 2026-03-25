import "./style.css";
import Phaser from "phaser";
import Player from "./objects/Player";
import FallingObject from "./objects/FallingObject";
import ScoreManager from "./managers/ScoreManager";
import TimeManager from "./managers/TimeManager";
import UIManager from "./ui/UIManager";
import Hammer from "./objects/Hammer";
const sizes = {
  width: window.innerWidth - 100,
  height: window.innerHeight - 300,
};

const speedDown = 300;

const gameStartDiv = document.querySelector("#gameStartDiv");
const gameStartBtn = document.querySelector("#gameStartBtn");

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.textTime;
    this.timedEvent;
    this.remainingTime;
    this.coinMusic;
    this.backgroundMusic;
    this.emitter;
    this.toWin = 10;
  }
  preload() {
    this.load.image("anvil", "/assets/anvil.png");
    this.load.image("hammer", "/assets/hammer.png");

    this.load.image("bg", "/assets/bgtown.jpg");
    this.load.image("basket", "/assets/basket.png");
    this.load.image("apple", "/assets/apple.png");
    this.load.image("money", "/assets/money.png");
    // Music
    this.load.audio("bgMusic", "/assets/bgMusic.mp3");
    this.load.audio("coin", "/assets/coin.mp3");
  }

  create() {
    this.scene.pause("scene-game");

    this.coinMusic = this.sound.add("coin");

    this.add.image(0, 0, "bg").setOrigin(0, 0).setScale(2, 2);
    this.add.image(sizes.width / 2, sizes.height + -50, "anvil");
    console.log(Math.round(sizes.height));
    // this.player = new Player(this, 250, 450);
    this.hammer = new Hammer(this, 259, 450);
    // this.target = new FallingObject(this, 0, 0, "apple");
    this.scoreManager = new ScoreManager(this);
    // this.timeManager = new TimeManager(this, 300000, this.gameOver);

    this.physics.add.overlap(
      // this.target,
      // this.player,
      this.hammer,
      this.anvil,
      this.targetHit,
      null,
      this,
    );

    this.cursor = this.input.keyboard.createCursorKeys();

    // this.emitter = this.add.particles(0, 0, "money", {
    //   speed: 100,
    //   gravityY: speedDown - 200,
    //   scale: 0.04,
    //   duration: 100,
    //   emitting: false,
    // });
    // this.emitter.startFollow(
    //   this.player,
    //   this.player.width / 4,
    //   this.player.height / 4,
    //   true,
    // );
  }

  update() {
    // this.player.move(this.cursor, 350);
    // this.timeManager.update();
    // if (this.target.y >= sizes.height) {
    //   this.target.respawn(sizes.height);
    // }
  }

  getRandomX() {
    return Math.floor(Math.random() * 480);
  }

  targetHit() {
    // this.coinMusic.play();
    // this.target.respawn(500);
    this.emitter.start();
    this.scoreManager.addPoint();
  }

  gameOver() {
    this.sys.game.destroy(true);
    UIManager.ShowGameOver(
      this.scoreManager.points,
      this.scoreManager.points >= this.toWin,
    );
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
