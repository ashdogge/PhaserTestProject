export default class ScoreManager {
  constructor(scene) {
    this.scene = scene;
    this.points = 0;

    this.text = scene.add.text(180, 10, "Score: 0", {
      font: "25px Arial",
      fill: "#000",
    });
  }

  addPoint() {
    this.points++;
    this.text.setText(`Score: ${this.points}`);
  }
}
