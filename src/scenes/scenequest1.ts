import { Scene } from "phaser";

export class SceneQuest1 extends Scene {
  constructor() {
    super({
      key: "GameSceneQuest1",
    });
  }

  create() {
    console.log("gamescene_quest1");

    // setTimeout(() => {
    //   this.scene.start("GameScene2");
    // }, 2000);
  }
}
