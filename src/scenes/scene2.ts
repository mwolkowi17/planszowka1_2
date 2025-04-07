import { Scene } from "phaser";
import { PawnMaps } from "../lib/pawn-maps";
import { Quests } from "../lib/quests";

export class Scene2 extends Scene {
  przycisk_rzut_kostka: Phaser.GameObjects.Image;
  przycisk_rzut_kostka_gracz2: Phaser.GameObjects.Image;
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
  krok_gracz2_na_planszy: any;
  plansza_pod_quizz: Phaser.GameObjects.Image;
  obrazek_quizz: Phaser.GameObjects.Image;
  text_quizz: Phaser.GameObjects.Image;
  przycisk_dalej: Phaser.GameObjects.Image;
  pytanie_quizz1: Phaser.GameObjects.Image;
  odpowiedz1: Phaser.GameObjects.Image;
  odpowiedz2: Phaser.GameObjects.Image;
  odpowiedz3: Phaser.GameObjects.Image;
  przycisk_sprawdz: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "GameScene2",
    });
  }
  create(): void {
    //pozycja startowa gracza nr 1
    this.krok_gracz1_na_planszy = 0;

    //pozycja startowa gracza nr 2;
    this.krok_gracz2_na_planszy = 0;

    //zdefinowanie pozycji (mapy wszystkich pozycji) gracza nr 1
    const pozycje_pionka_gracza1 = new PawnMaps().pionek_gracza1;

    //zdefinowanie pozycji (mapy wszystkich pozycji) gracza nr 1
    const pozycje_pionka_gracza2 = new PawnMaps().pionek_gracza2;

    //adding assets to stage
    this.add.image(640, 360, "plansza_scena2").scale = 0.67;

    //przyscisk rzut koską gracz1

    this.przycisk_rzut_kostka = this.add
      .image(1153, 435, "button_rzut")
      .setInteractive()
      .setAlpha(1);
    this.przycisk_rzut_kostka.scale = 0.67;

    //przycisk rzut kostką gracz2
    this.przycisk_rzut_kostka_gracz2 = this.add
      .image(1153, 435, "button_rzut")
      .setInteractive()
      .setAlpha(0);
    this.przycisk_rzut_kostka_gracz2.scale = 0.67;

    //pionek1

    this.postac1 = this.add.image(100, 130, "postac1");
    this.postac1.scale = 0.7;
    this.postac1.rotation = Math.PI * 1.2;

    //pionek2
    this.postac2 = this.add.image(110, 180, "postac2");
    //this.postac2 = this.add.image(850, 520, "postac2");
    this.postac2.scale = 0.7;
    this.postac2.rotation = Math.PI * 1.2;

    //"startowy" widok kostki
    this.kostka = this.add.image(1153, 534, "kostka_blank").setAlpha();
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
    myEventPoinerOverOut(this.przycisk_rzut_kostka_gracz2);

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

    //flaga true/false pokazująca czy gracz nr 2 nie przeszedł całej planszy, wartość falsce wskazuje zakończenie ruchu na planszy
    let kontrolka_ruch_na_planszy_gracz2 = true;

    //nowa instancja obiektu Quests/Quizz
    const quests = new Quests();

    //ładowanie assetów do quizzów początkowo z przezroczystością (być może do usunięcia bo będzie to w eventach)
    this.plansza_pod_quizz = this.add
      .image(513, 356, "plansza_quizz")
      .setAlpha(1);
    this.plansza_pod_quizz.scale = 0.67;

    this.obrazek_quizz = this.add.image(253, 343, "palac_kultury1").setAlpha(0);
    this.obrazek_quizz.scale = 0.67;

    this.text_quizz = this.add.image(657, 343, "palac_tresc1").setAlpha(0);
    this.text_quizz.scale = 0.67;

    this.przycisk_dalej = this.add
      .image(777, 557, "button_dalej")
      .setAlpha(0)
      .setInteractive();
    this.przycisk_dalej.scale = 0.45;
    myEventPoinerOverOut(this.przycisk_dalej);

    this.pytanie_quizz1 = this.add.image(453, 203, "pytanie_quiz1").setAlpha(1);
    this.pytanie_quizz1.scale = 0.67;

    //przycisk_rzut_event
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
      if (
        this.krok_gracz1_na_planszy + wynik_rzutu < 23 &&
        kontrolka_ruch_na_planszy === true
      ) {
        this.postac1.setPosition(
          pozycje_pionka_gracza1[this.krok_gracz1_na_planszy + wynik_rzutu][0],
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

      this.przycisk_rzut_kostka.setAlpha(0);
      this.przycisk_rzut_kostka_gracz2.setAlpha(1);

      //wyświetlanie quizów w zależności od spełnienia warunków

      if (quests.czy_zadanie(this.krok_gracz1_na_planszy)) {
        console.log(
          "quiz nr: " + quests.pokaz_zadanie(this.krok_gracz1_na_planszy)
        );

        this.plansza_pod_quizz.setAlpha(1);
        this.obrazek_quizz = this.add.image(
          253,
          343,
          quests.pokaz_zadanie(this.krok_gracz1_na_planszy)[0]
        );
        this.obrazek_quizz.scale = 0.67;
        this.obrazek_quizz.setAlpha(1);
        this.text_quizz = this.add.image(
          657,
          343,
          quests.pokaz_zadanie(this.krok_gracz1_na_planszy)[1]
        );
        this.text_quizz.scale = 0.67;
        this.text_quizz.setAlpha(1);

        this.przycisk_dalej.setAlpha(1);
      }

      if (
        localStorage.getItem("player2") === ""
        //tu jest problem, w momencie jak będą faktycznie jakieś quizzy to wtedy trzeba dodać
        //&&
        // !quests.czy_zadanie(this.krok_gracz1_na_planszy)
      ) {
        this.przycisk_rzut_kostka_gracz2.setAlpha(0);

        setTimeout(() => {
          console.log("Ruch gracza nr2");

          wynik_rzutu = rzucaj();
          //wyświetlenie wyrzuconego wyniku na kostce (line 115)
          pokaz_kostke(wynik_rzutu);

          if (
            this.krok_gracz2_na_planszy + wynik_rzutu < 23 &&
            kontrolka_ruch_na_planszy_gracz2 === true
          ) {
            this.postac2.setPosition(
              pozycje_pionka_gracza2[
                this.krok_gracz2_na_planszy + wynik_rzutu
              ][0],
              pozycje_pionka_gracza2[
                this.krok_gracz2_na_planszy + wynik_rzutu
              ][1]
            );
            this.krok_gracz2_na_planszy =
              this.krok_gracz2_na_planszy + wynik_rzutu + 1;
            console.log("krok na planszy: " + this.krok_gracz2_na_planszy);
          } else {
            this.postac2.setPosition(860, 510);
            kontrolka_ruch_na_planszy_gracz2 = false;
            console.log("nr 2 - wygrałeś!!!");
          }
          this.przycisk_rzut_kostka.setAlpha(1);

          //wyświetlanie quizów w zależności od spełnienia warunków

          if (quests.czy_zadanie(this.krok_gracz2_na_planszy)) {
            //this.scene.start(quests.pokaz_zadanie(this.krok_gracz2_na_planszy));
            console.log(
              "quiz nr: " + quests.pokaz_zadanie(this.krok_gracz2_na_planszy)
            );
          }
        }, 2000);
      }
    });

    //przycisk_rzut_gracz2_event==================
    this.przycisk_rzut_kostka_gracz2.on("pointerdown", () => {
      //"wyłączenie" kostki początkowej
      this.kostka.setAlpha(0);
      console.log("rzut kostką:");

      //uruchomienie mechanizmu losującego (line 156)
      let wynik_rzutu = rzucaj();
      console.log(wynik_rzutu);

      //wyświetlenie wyrzuconego wyniku na kostce (line 115)
      pokaz_kostke(wynik_rzutu);

      //wyświetlenie pozycji pionka gracza nr 1 po rzucie pod warunkiem, że jego kolej
      if (
        this.krok_gracz2_na_planszy + wynik_rzutu < 23 &&
        kontrolka_ruch_na_planszy === true
      ) {
        this.postac2.setPosition(
          pozycje_pionka_gracza1[this.krok_gracz2_na_planszy + wynik_rzutu][0],
          pozycje_pionka_gracza1[this.krok_gracz2_na_planszy + wynik_rzutu][1]
        );
        this.krok_gracz2_na_planszy =
          this.krok_gracz2_na_planszy + wynik_rzutu + 1;
        console.log("krok na planszy: " + this.krok_gracz2_na_planszy);
      } else {
        this.postac2.setPosition(860, 510);
        kontrolka_ruch_na_planszy = false;
        console.log("wygrałeś!!!");
      }

      this.przycisk_rzut_kostka.setAlpha(1);
      this.przycisk_rzut_kostka_gracz2.setAlpha(0);

      //wyświetlanie quizów w zależności od spełnienia warunków

      if (quests.czy_zadanie(this.krok_gracz2_na_planszy)) {
        // zapisanie kroku gracza 2 w localStorage
        //localStorage.setItem("krok_gracza2", this.krok_gracz2_na_planszy);
        //this.scene.start(quests.pokaz_zadanie(this.krok_gracz2_na_planszy));
        console.log(
          "quiz nr: " + quests.pokaz_zadanie(this.krok_gracz2_na_planszy)
        );
      }
    });

    //event przycisk dalej
    this.przycisk_dalej.on("pointerdown", () => {
      console.log("quizz dalej");
    });
  }
}
