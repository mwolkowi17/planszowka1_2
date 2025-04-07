import { Scene } from "phaser";
import { Scene2 } from "../scenes/scene2";

export class Quests extends Scene {
  kolekcja_questow: any;
  kolekcja_assetów: any;

  constructor() {
    super();
    this.kolekcja_questow = ["GameSceneQuest1", "GameSceneQuest2"];
    this.kolekcja_assetów = [
      [
        "palac_kultury",
        "palac_tresc",
        "pytanie_quiz1",
        "odpowiedz1",
        "odpowiedz2",
        "odpowiedz3",
        1,
      ],
      ["palac_kultury2", "palac_tresc2"],
    ];
  }

  //funkcja_która sprawdzi czy ma być wyświetlone zadanie
  czy_zadanie(krok_na_planszy: number): boolean {
    if (krok_na_planszy === 1) {
      return true;
    }
    if (krok_na_planszy === 4) {
      return true;
    }
    if (krok_na_planszy === 5) {
      return true;
    }
    if (krok_na_planszy === 7) {
      return true;
    }
    if (krok_na_planszy === 9) {
      return true;
    }
    if (krok_na_planszy === 10) {
      return true;
    }
    if (krok_na_planszy === 12) {
      return true;
    }
    if (krok_na_planszy === 14) {
      return true;
    }
    if (krok_na_planszy === 16) {
      return true;
    }
    if (krok_na_planszy === 17) {
      return true;
    }
    if (krok_na_planszy === 19) {
      return true;
    }
    if (krok_na_planszy === 21) {
      return true;
    }
    if (krok_na_planszy === 24) {
      return true;
    } else {
      return false;
    }
  }

  //funkcja która zwróci klucz zadania do zrobienia
  pokaz_zadanie(krok_na_planszy: any): any {
    if (krok_na_planszy === 1) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 4) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 5) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 7) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 9) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 10) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 12) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 14) {
      return this.kolekcja_assetów[0];
    }
    if (krok_na_planszy === 16) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 17) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 19) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 21) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 24) {
      return this.kolekcja_questow[1];
    }
  }
}
