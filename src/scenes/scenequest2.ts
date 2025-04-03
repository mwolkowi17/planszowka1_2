import { Scene } from "phaser";

export class SceneQuest2 extends Scene {
  constructor() {
    super({
      key: "GameSceneQuest2",
    });
  }

  create() {
    console.log("gamescene_quest2");
    console.log("g1 " + localStorage.getItem("krok_gracza1"));
    console.log("g2 " + localStorage.getItem("krok_gracza2"));
    // setTimeout(() => {
    //   this.scene.start("GameScene2");
    // }, 2000);
  }
}
