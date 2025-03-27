import { Scene } from "phaser";

export class Scene2 extends Scene {
  przycisk_rzut_kostka: Phaser.GameObjects.Image;
  postac1: Phaser.GameObjects.Image;
  postac2: Phaser.GameObjects.Image;
  kostka: Phaser.GameObjects.Image;
  gracz1_name: Phaser.GameObjects.Text;
  gracz2_name: Phaser.GameObjects.Text;
  kostka_wynik1: Phaser.GameObjects.Image;
  kostka_wynik2: Phaser.GameObjects.Image;
  kostka_wynik3: Phaser.GameObjects.Image;
  kostka_wynik4: Phaser.GameObjects.Image;
  kostka_wynik5: Phaser.GameObjects.Image;
  kostka_wynik6: Phaser.GameObjects.Image;

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
    //this.postac1 = this.add.image(180, 560, "postac1");
    this.postac1.scale = 0.7;
    this.postac1.rotation = Math.PI * 1.2;

    this.postac2 = this.add.image(110, 180, "postac2");
    this.postac2.scale = 0.7;
    this.postac2.rotation = Math.PI * 1.2;

    this.kostka = this.add.image(1153, 534, "kostka1").setAlpha();
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

    //kostki do rzutu

    const kostki: Phaser.GameObjects.Image[] = [];

    this.kostka_wynik1 = this.add
      .image(1153, 534, "kostka_wyniki1")
      .setAlpha(0);
    this.kostka_wynik1.scale = 0.7;
    kostki.push(this.kostka_wynik1);

    this.kostka_wynik2 = this.add
      .image(1153, 534, "kostka_wyniki2")
      .setAlpha(0);
    this.kostka_wynik2.scale = 0.7;
    kostki.push(this.kostka_wynik2);

    this.kostka_wynik3 = this.add
      .image(1153, 534, "kostka_wyniki3")
      .setAlpha(0);
    this.kostka_wynik3.scale = 0.7;
    kostki.push(this.kostka_wynik3);

    this.kostka_wynik4 = this.add
      .image(1153, 534, "kostka_wyniki4")
      .setAlpha(0);
    this.kostka_wynik4.scale = 0.7;
    kostki.push(this.kostka_wynik4);

    this.kostka_wynik5 = this.add
      .image(1153, 534, "kostka_wyniki5")
      .setAlpha(0);
    this.kostka_wynik5.scale = 0.7;
    kostki.push(this.kostka_wynik5);

    this.kostka_wynik6 = this.add
      .image(1153, 534, "kostka_wyniki6")
      .setAlpha(0);
    this.kostka_wynik6.scale = 0.7;
    kostki.push(this.kostka_wynik6);

    function pokaz_kostke(a: integer) {
      for (let x = 0; x < 6; x++) {
        if (x === a) {
          kostki[x].setAlpha(1);
        } else {
          kostki[x].setAlpha(0);
        }
      }
    }
    this.kostka_wynik1.setAlpha(0);
    this.kostka_wynik2.setAlpha(0);
    this.kostka_wynik3.setAlpha(0);
    this.kostka_wynik4.setAlpha(0);
    this.kostka_wynik5.setAlpha(0);
    this.kostka_wynik6.setAlpha(0);

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
    myEventPoinerOverOut(this.przycisk_rzut_kostka);

    // console.log(localStorage.getItem("player1"));
    // console.log(localStorage.getItem("player2"));

    //colection of coordinate the player1

    const pozycje_pionka_gracza1 = [
      [150, 130],
      [250, 170],
      [240, 300],
      [180, 380],
      [130, 460],
      [180, 560],
    ];

    //Random from 6 function

    function rzucaj(): integer {
      let wynik;
      wynik = Math.floor(Math.random() * 6);
      return wynik;
    }

    this.przycisk_rzut_kostka.on("pointerdown", () => {
      this.kostka.setAlpha(0);
      console.log("rzut kostką:");
      let wynik_rzutu = rzucaj();
      console.log(wynik_rzutu);
      // tutaj zamiast tego wyżej powinna być funkcja iterująca się przez to
      pokaz_kostke(wynik_rzutu);
      this.postac1.setPosition(
        pozycje_pionka_gracza1[wynik_rzutu][0],
        pozycje_pionka_gracza1[wynik_rzutu][1]
      );
    });
  }
}
