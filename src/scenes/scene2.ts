import { Scene } from "phaser";

export class Scene2 extends Scene {
  przycisk_rzut_kostka: Phaser.GameObjects.Image;
  constructor() {
    super({
      key: "GameScene2",
    });
  }
  create(): void {
    //adding assets to stage
    this.add.image(640, 360, "plansza_scena2").scale = 0.67;
    this.przycisk_rzut_kostka = this.add
      .image(1153, 435, "button_rzut")
      .setInteractive();

    this.przycisk_rzut_kostka.scale = 0.67;
    const el = document.createElement("input");
    // const stage = document.querySelector("div");
    // const stage = document.getElementById("inner_cont");
    // stage.appendChild(el);
    // el.textContent = "Wpisz coś";
    // el.style.height = "30px";
    // el.style.width = "100px";
    // el.style.position = "absolute";
    // el.style.zIndex = "2";
    // el.style.left = "45%";
    // el.style.bottom = "30%";

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
    myEventPoinerOverOut(this.przycisk_rzut_kostka);

    const a = "Marcin";
    console.log(localStorage.getItem("player1"));
    console.log(localStorage.getItem("player2"));

    // this.przycisk_start.on("pointerdown", () => {
    //   //this.scene.start("GameScene1");
    //   localStorage.setItem("player", el.value);

    //   console.log(localStorage.getItem("player"));
    //   document.body.style.cursor = "initial";
    // });
  }
}
