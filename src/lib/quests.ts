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
    return true;
  }

  //funkcja która zwróci klucz zadania do zrobienia
  pokaz_zadanie(krok_na_planszy: any): string {
    if (krok_na_planszy === 1) {
      return this.kolekcja_questow[0];
    }
  }
}
