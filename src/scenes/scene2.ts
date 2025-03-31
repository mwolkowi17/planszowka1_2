import { Scene } from "phaser";
import { PawnMaps } from "../lib/pawn-maps";

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
  krok_gracz1_na_planszy: any;

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

    //pionek1
    this.postac1 = this.add.image(100, 130, "postac1");
    this.postac1.scale = 0.7;
    this.postac1.rotation = Math.PI * 1.2;

    //pionek2
    this.postac2 = this.add.image(110, 180, "postac2");
    this.postac2.scale = 0.7;
    this.postac2.rotation = Math.PI * 1.2;

    //"startowy" widok kostki
    this.kostka = this.add.image(1153, 534, "kostka1").setAlpha();
    this.kostka.scale = 0.7;

    //imiona graczy

    //jeśli pole poprzedniej scenie jest puste to poniższy conditional wpisuje "Komputer" jako gracza
    let nameA = localStorage.getItem("player2");
    if (localStorage.getItem("player2") === "") {
      nameA = "Komputer";
    }
    //pierwszy gracz
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

    //drugi gracz
    this.gracz2_name = this.add.text(1110, 295, nameA, {
      fontSize: "26px",
      fontStyle: "bold",
      color: "black",
    });

    //kostki do rzutu - widoki wyniku wyrzyconego
    //kolekcja wszystkich możeliwych widoków
    const kostki: Phaser.GameObjects.Image[] = [];

    //poszczególne widoki
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

    // funkcja sterująca który wynik rzutu kostką wyświetlić z kolekcji wszystkich możliwych widoków - line 74
    function pokaz_kostke(a: integer) {
      for (let x = 0; x < 6; x++) {
        if (x === a) {
          kostki[x].setAlpha(1);
        } else {
          kostki[x].setAlpha(0);
        }
      }
    }

    //pierwotne ustawieni przezroczystości wszystkich widoków (line 74) na 0-niewidoczne
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

    //zdefinowanie pozycji (mapy wszystkich pozycji) gracza nr 1
    const pozycje_pionka_gracza1 = new PawnMaps().pionek_gracza1;

    //pozycja startowa gracza nr 1
    this.krok_gracz1_na_planszy = 0;

    //funkcja zwracająca jedną liczbę - odpwiednik rzutu kostką, główny mechanizm losujący wynik kostki w scenie

    function rzucaj(): integer {
      let wynik;
      wynik = Math.floor(Math.random() * 6);
      return wynik;
    }

    //flagi true/false definiujące który z graczy przeprowadza ruch
    let ruch_gracza_nr1 = true;
    let ruch_gracza_nr2 = false;

    //flaga true/false pokazująca czy gracz nr 1 nie przeszedł całej planszy, wartość falsce wskazuje zakończenie ruchu na planszy
    let kontrolka_ruch_na_planszy = true;

    this.przycisk_rzut_kostka.on("pointerdown", () => {
      //"wyłączenie" kostki początkowej
      this.kostka.setAlpha(0);
      console.log("rzut kostką:");
      //uruchomienie mechanizmu losującego (line 156)
      let wynik_rzutu = rzucaj();
      console.log(wynik_rzutu);

      //wyświetlenie wyrzuconego wyniku na kostce (line 115)
      pokaz_kostke(wynik_rzutu);

      //wyświetlenie pozycji pionka gracza nr 1 po rzucie pod warunkiem, że jego kolej
      if (ruch_gracza_nr1 === true) {
        if (
          this.krok_gracz1_na_planszy + wynik_rzutu < 23 &&
          kontrolka_ruch_na_planszy === true
        ) {
          this.postac1.setPosition(
            pozycje_pionka_gracza1[
              this.krok_gracz1_na_planszy + wynik_rzutu
            ][0],
            pozycje_pionka_gracza1[this.krok_gracz1_na_planszy + wynik_rzutu][1]
          );
          this.krok_gracz1_na_planszy =
            this.krok_gracz1_na_planszy + wynik_rzutu + 1;
          console.log("krok na planszy: " + this.krok_gracz1_na_planszy);
        } else {
          this.postac1.setPosition(860, 510);
          kontrolka_ruch_na_planszy = false;
          console.log("wygrałeś!!!");
        }
      }
      ruch_gracza_nr1 = !ruch_gracza_nr1;
      ruch_gracza_nr2 = !ruch_gracza_nr2;
      console.log(ruch_gracza_nr2);
    });
  }
}
