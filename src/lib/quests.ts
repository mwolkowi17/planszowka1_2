import { Scene } from "phaser";
import { Scene2 } from "../scenes/scene2";

export class Quests extends Scene {
  constructor() {
    super();
  }

  pokaz_zadanie(krok_na_planszy: any): void {
    if (krok_na_planszy !== 0) {
      console.log("odpwowiednia plansza:" + krok_na_planszy);
    }
  }
}
