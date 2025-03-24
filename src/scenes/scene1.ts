import { Scene } from "phaser";

export class Scene1 extends Scene {
  przycisk_start: Phaser.GameObjects.Image;
  constructor() {
    super({
      key: "GameScene1",
    });
  }
  create(): void {
    //adding assets to stage
    this.add.image(640, 360, "plansza_start").scale = 0.7;
    this.przycisk_start = this.add
      .image(640, 560, "button_dalej")
      .setInteractive();

    this.przycisk_start.scale = 0.5;

    //function for event mouse handlin

    function myEventPoinerOverOut(button: any) {
      button.on("pointerover", function (event) {
        this.setTint(0x8080ff);
        document.body.style.cursor = "pointer";
      });

      button.on("pointerout", function (event) {
        this.clearTint();
        document.body.style.cursor = "initial";
      });
    }
    myEventPoinerOverOut(this.przycisk_start);

    this.przycisk_start.on("pointerdown", () => {
      this.scene.start("GameScene2");
      document.body.style.cursor = "initial";
    });
  }
}
