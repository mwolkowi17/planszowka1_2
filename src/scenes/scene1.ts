import { Scene } from "phaser";

export class Scene1 extends Scene {
  przycisk_start: Phaser.GameObjects.Image;
  przycisk_gra_z_komputerem: Phaser.GameObjects.Image;
  przycisk_gra_z_komputerem_zazn: Phaser.GameObjects.Image;
  sound1: Phaser.GameObjects.Image;
  sound2: Phaser.GameObjects.Image;
  name_input1: any;
  name_input2_opis: Phaser.GameObjects.Image;
  name_input2: any;
  Instruction_Sound_1: any;
  Instruction_Sound_2: any;

  constructor() {
    super({
      key: "GameScene1",
    });
  }

  preload(): void {
    this.load.audio("sample", "assets/audio/music.mp3");
  }

  create(): void {
    //adding assets to stage
    this.add.image(640, 360, "plansza_scena1").scale = 0.7;
    this.add.image(360, 220, "imie_gracza_1").scale = 0.7;
    this.name_input2_opis = this.add.image(920, 220, "imie_gracza_2");
    this.name_input2_opis.scale = 0.7;
    this.sound1 = this.add.image(292, 210, "button_sound").setInteractive();
    this.sound1.scale = 0.7;
    this.sound2 = this.add.image(850, 210, "button_sound").setInteractive();
    this.sound2.scale = 0.7;

    this.przycisk_start = this.add
      .image(640, 560, "button_dalej")
      .setInteractive();

    this.przycisk_start.scale = 0.7;

    this.przycisk_gra_z_komputerem = this.add
      .image(640, 420, "button_z_komputerem")
      .setInteractive();

    this.przycisk_gra_z_komputerem.scale = 0.7;

    this.przycisk_gra_z_komputerem_zazn = this.add
      .image(640, 420, "button_z_komputerem_zazn")
      .setInteractive()
      .setAlpha(0);
    this.przycisk_gra_z_komputerem_zazn.scale = 0.7;

    //sound add
    this.Instruction_Sound_1 = this.sound.add("sample", { loop: false });

    this.sound1.on("pointerdown", () => {
      this.Instruction_Sound_1.play();
      this.Instruction_Sound_2.stop();
    });

    this.Instruction_Sound_2 = this.sound.add("sample", { loop: false });

    this.sound2.on("pointerdown", () => {
      this.Instruction_Sound_2.play();
      this.Instruction_Sound_1.stop();
    });

    //ustawianie/resetowanie kroku gracza w localStorage
    localStorage.setItem("krok_gracza1", "");
    localStorage.setItem("krok_gracza2", "");

    //input section

    // function which creates input
    function create_input(left_pos: string, bottom_pos: string) {
      const el = document.createElement("input");
      const stage = document.getElementById("inner_cont");
      stage.appendChild(el);
      el.textContent = "Wpisz coś";
      el.style.height = "30px";
      el.style.width = "150px";
      el.style.position = "absolute";
      el.style.zIndex = "2";
      el.style.border = "3px solid red";
      el.style.borderRadius = "4px";
      el.style.left = left_pos; //np "45%"
      el.style.bottom = bottom_pos; //np "30%"
      return el;
    }

    this.name_input1 = create_input("22%", "58%");
    this.name_input2 = create_input("66%", "58%");

    //function for event mouse handlin

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
    myEventPoinerOverOut(this.przycisk_start);
    myEventPoinerOverOut(this.przycisk_gra_z_komputerem);
    myEventPoinerOverOut(this.przycisk_gra_z_komputerem_zazn);
    myEventPoinerOverOut(this.sound1);
    myEventPoinerOverOut(this.sound2);

    //button click event handling

    this.przycisk_start.on("pointerdown", () => {
      localStorage.setItem("player1", this.name_input1.value);
      localStorage.setItem("player2", this.name_input2.value);
      const stage = document.getElementById("inner_cont");
      stage.removeChild(this.name_input1);
      stage.removeChild(this.name_input2);
      this.scene.start("GameScene2");
      document.body.style.cursor = "initial";
    });

    this.przycisk_gra_z_komputerem.on("pointerdown", () => {
      this.name_input2.style.visibility = "hidden";
      this.name_input2_opis.setAlpha(0);
      this.sound2.setAlpha(0);
      // this.name_input2_opis.destroy();
      // this.sound2.destroy();
      // this.przycisk_gra_z_komputerem.destroy();
      this.przycisk_gra_z_komputerem.setAlpha(0);
      this.przycisk_gra_z_komputerem_zazn.setAlpha(1);
    });

    this.przycisk_gra_z_komputerem_zazn.on("pointerdown", () => {
      this.przycisk_gra_z_komputerem_zazn.setAlpha(0);
      this.przycisk_gra_z_komputerem.setAlpha(1);
      this.name_input2.style.visibility = "visible";
      this.name_input2_opis.setAlpha(1);
      this.sound2.setAlpha(1);
    });
  }
}
