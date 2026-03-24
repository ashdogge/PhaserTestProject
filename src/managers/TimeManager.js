export default class TimeManager {
  constructor(scene, duration, onEnd) {
    this.scene = scene;

    this.timer = scene.time.delayedCall(duration, onEnd, [], scene);

    this.text = scene.add.text(10, 10, "", {
      font: "25px Arial",
      fill: "#000",
    });
  }

  update() {
    const remaining = Math.round(this.timer.getRemainingSeconds());
    this.text.setText(`Time: ${remaining}`);
  }
}
