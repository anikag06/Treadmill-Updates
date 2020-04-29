export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("bg", "./assets/background.png");
    this.load.image("play_btn", "./assets/play_btn.png");
    this.load.image("pause_btn", "./assets/pause_btn.png");
    this.load.image("home_btn", "./assets/home_btn.png");
    this.load.image("restart_btn", "./assets/restart_btn.png");
    this.load.image("next_btn", "./assets/next_btn.png");
    this.load.image("arrow", "./assets/arrow.png");
    this.load.image("bow", "./assets/bow.png");
    this.load.image("bow_bend", "./assets/bow_bend.png");
    this.load.image(
      "blue_balloon",
      "./assets/small_blue_balloon.png"
    );
    this.load.image(
      "green_balloon",
      "./assets/small_green_balloon.png"
    );
    this.load.image(
      "purple_balloon",
      "./assets/small_purple_balloon.png"
    );
    this.load.image("red_balloon", "./assets/small_red_balloon.png");
    this.load.image(
      "yellow_balloon",
      "./assets/small_yellow_balloon.png"
    );
    this.load.image(
      "danger_balloon",
      "./assets/danger_balloon.png"
    );
  }

  create() {
    this.scene.start("HomeScene");
  }
}
