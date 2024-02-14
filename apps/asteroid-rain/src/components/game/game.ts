import Phaser from 'phaser';
import { Math } from 'phaser';

const width = 800;
const height = 600;
const shipSpeed = 150;

const shipKey = 'ship';
const skyKey = 'sky';
const shipTrailKey = 'trail';
const asteroidKey = 'asteroid';

class TestScene extends Phaser.Scene {
  points = 0;

  ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  asteroidParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  asteroidGroup: Phaser.Physics.Arcade.Group;

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image(skyKey, 'assets/skies/nebula.jpg');
    this.load.image(shipKey, 'assets/sprites/ship.png');
    this.load.image(shipTrailKey, 'assets/particles/red.png');
    this.load.image(asteroidKey, 'assets/games/asteroids/asteroid1.png');
  }

  create() {
    // #region Background & inputs
    this.add.tileSprite(width / 2, height / 2, width, height, skyKey);

    this.cursorKeys =
      this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
    // #endregion

    // #region Ship
    this.ship = this.physics.add.image(width / 2, height - 100, shipKey);

    this.ship.setCollideWorldBounds(true);

    // #endregion

    // #region Ship trail
    const trailParticles = this.add.particles(0, 0, shipTrailKey, {
      speed: 10,
      scale: { start: 0.2, end: 0 },
      blendMode: 'ADD',
    });

    trailParticles.startFollow(this.ship);
    // #endregion

    // #region Asteroid rain
    this.asteroidGroup = this.physics.add.group();

    this.physics.add.collider(
      this.ship,
      this.asteroidGroup,
      (ship, asteroid) => {
        console.log('Game Over, Score: ', this.points);

        this.game.pause();
      }
    );

    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        const singleAsteroid: Phaser.Types.Physics.Arcade.ImageWithDynamicBody =
          this.asteroidGroup.create(
            Math.Between(20, width - 20),
            0,
            asteroidKey
          );

        singleAsteroid.setRotation(Math.Between(0, 180));

        singleAsteroid.setVelocityY(Math.Between(50, 200));
        singleAsteroid.setAngularVelocity(Math.Between(-100, 100));

        singleAsteroid.setScale(Math.FloatBetween(0.6, 1.1));

        this.time.delayedCall(10e3, () => {
          if (singleAsteroid.active) {
            this.points++;
            console.log('Add point;');
          }

          singleAsteroid.destroy();
        });
      },
    });
    // #endregion
  }

  update(time: number, delta: number): void {
    const { left, right, up, down } = this.cursorKeys;

    if (left.isDown) {
      this.ship.setVelocityX(-shipSpeed);
    } else if (right.isDown) {
      this.ship.setVelocityX(shipSpeed);
    } else {
      this.ship.setVelocityX(0);
    }

    if (up.isDown) {
      this.ship.setVelocityY(-shipSpeed);
    } else if (down.isDown) {
      this.ship.setVelocityY(shipSpeed);
    } else {
      this.ship.setVelocityY(0);
    }
  }
}

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width,
  height,
  parent: 'asteroid-game',
  scene: TestScene,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};
