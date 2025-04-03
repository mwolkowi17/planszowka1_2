import { Scene } from "phaser";
import { Scene2 } from "../scenes/scene2";

export class Quests extends Scene {
  kolekcja_questow: any;

  constructor() {
    super();
    this.kolekcja_questow = ["GameSceneQuest1", "GameSceneQuest2"];
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
    } else {
      return false;
    }
  }

  //funkcja która zwróci klucz zadania do zrobienia
  pokaz_zadanie(krok_na_planszy: any): string {
    if (krok_na_planszy === 1) {
      return this.kolekcja_questow[0];
    }
    if (krok_na_planszy === 4) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 5) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 7) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 9) {
      return this.kolekcja_questow[1];
    }
    if (krok_na_planszy === 10) {
      return this.kolekcja_questow[1];
    }
  }
}
