import "phaser";
import Boot from "./scenes/boot";
import Preload from "./scenes/preload";
import { GameStart as GameSceneStart } from "./scenes/gameStart";
import { Scene1 as GameScene1 } from "./scenes/scene1";
import { Scene2 as GameScene2 } from "./scenes/scene2";
import { SceneQuest1 as GameSceneQuest1 } from "./scenes/scenequest1";
import { SceneQuest2 as GameSceneQuest2 } from "./scenes/scenequest2";

const config: Phaser.Types.Core.GameConfig = {
  title: "Planszowka1_2",

  scene: [
    Boot,
    Preload,
    GameSceneStart,
    GameScene1,
    GameScene2,
    GameSceneQuest1,
    GameSceneQuest2,
  ],
  backgroundColor: "#343",
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "inner_cont",
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1280,
    height: 720,
    max: {
      width: 1280,
      height: 720,
    },
  },
};

window.addEventListener("load", () => {
  window["game"] = new Phaser.Game(config);
});
