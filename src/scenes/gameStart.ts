import { Scene } from "phaser";

export class GameStart extends Scene {
  przycisk_start: Phaser.GameObjects.Image;
  przycisk_sound: Phaser.GameObjects.Image;
  sampleSound: any;

  constructor() {
    super({
      key: "GameSceneStart",
    });
  }

  //preaload audio
  preload(): void {
    this.load.audio("sample", "assets/audio/music.mp3");
  }

  create(): void {
    //adding assets to stage
    this.add.image(640, 360, "plansza_start").scale = 0.5;
    this.przycisk_start = this.add
      .image(640, 560, "button_dalej")
      .setAlpha()
      .setInteractive();

    this.przycisk_start.scale = 0.5;
    this.przycisk_sound = this.add
      .image(845, 342, "button_sound")
      .setInteractive();
    this.przycisk_sound.scale = 0.5;

    //function for event mouse handling

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
    myEventPoinerOverOut(this.przycisk_sound);

    this.przycisk_start.on("pointerdown", () => {
      //this.scene.start("GameScene1");
      console.log("new scene");
      document.body.style.cursor = "initial";
    });

    //sound add
    this.sampleSound = this.sound.add("sample", { loop: true });
    this.przycisk_sound.on("pointerdown", () => {
      this.sampleSound.play();
    });

    //tween of button
    this.tweens.add({
      targets: this.przycisk_start,
      y: 460,
      duration: 3000,
      alpha: { value: 1, duration: 500, ease: "Power1" },
      ease: "cubic.out",
      delay: 200,
    });
  }
}
