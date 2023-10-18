import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

class Enemy {
  initialX: number;
  initialY: number;
  x: number;
  y: number;
  vel: number;
  //body: Enemy;
  constructor(x: number, y: number, vel: number) {
    this.x = x;
    this.initialX = x;
    this.y = y;
    this.initialY = y;
    this.vel = vel;
    //this.body = body;
  }
  respawn() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Shape;
  enemies = [
    new Enemy(100, 100, 5),
    new Enemy(200, 200, 2),
    new Enemy(300, 300, 9),
  ];

  velocity = 10;
  isFiring = false;

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    this.spinner = this.add.rectangle(440, 440, 50, 50, 0x00c013);
  }

  update() {
    this.starfield!.tilePositionX -= 4;

    if (this.left!.isDown && this.spinner!.x > 30 && !this.isFiring) {
      this.spinner!.setX(this.spinner!.x - this.velocity);
    }
    if (this.right!.isDown && this.spinner!.x < 610 && !this.isFiring) {
      this.spinner!.setX(this.spinner!.x + this.velocity);
    }

    if (this.fire!.isDown) {
      this.isFiring = true;
    }
    if (this.isFiring) {
      this.spinner!.setY(this.spinner!.y - this.velocity);
      if (this.spinner!.y < -30) {
        this.isFiring = false;
        this.spinner!.setY(440);
      }
    }
  }
}
