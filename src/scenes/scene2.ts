import { Scene } from "phaser";

export class Scene2 extends Scene {
  przycisk_rzut_kostka: Phaser.GameObjects.Image;
  postac1: Phaser.GameObjects.Image;
  postac2: Phaser.GameObjects.Image;
  kostka: Phaser.GameObjects.Image;
  gracz1_name: Phaser.GameObjects.Text;
  gracz2_name: Phaser.GameObjects.Text;
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

    this.postac1 = this.add.image(100, 130, "postac1");
    this.postac1.scale = 0.7;
    this.postac1.rotation = Math.PI * 1.2;

    this.postac2 = this.add.image(110, 180, "postac2");
    this.postac2.scale = 0.7;
    this.postac2.rotation = Math.PI * 1.2;

    this.kostka = this.add.image(1153, 534, "kostka1");
    this.kostka.scale = 0.7;
    let nameA = localStorage.getItem("player2");
    if (localStorage.getItem("player2") === "") {
      nameA = "Komputer";
    }
    this.gracz1_name = this.add.text(
      1110,
      220,
      localStorage.getItem("player1"),
      {
        fontSize: "26px",
        fontStyle: "bold",
        color: "black",
      }
    );
    this.gracz2_name = this.add.text(1110, 295, nameA, {
      fontSize: "26px",
      fontStyle: "bold",
      color: "black",
    });
    // this.gracz1_name.style.fontSize = "50";
    // this.gracz1_name.style.color = "black";

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
