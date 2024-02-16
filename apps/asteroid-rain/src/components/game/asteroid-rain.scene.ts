import Phaser, { Math } from 'phaser';

import { constants } from './constants';

const {
  gameConfig,
  assets: { phaserAssetsBaseUrl, ship, shipTrail, asteroid, sky },
} = constants;

const { width = 500, height = width } = gameConfig;

export class AsteroidRainScene extends Phaser.Scene {
  points = 0;
  pointText: Phaser.GameObjects.Text;

  asteroidGroup: Phaser.Physics.Arcade.Group;
  asteroidParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor() {
    super(constants.sceneNames.GameScene);
  }

  preload() {
    this.load.setBaseURL(phaserAssetsBaseUrl);

    [asteroid, ship, shipTrail, sky].forEach(({ key, url }) =>
      this.load.image(key, url)
    );
  }

  create() {
    // #region Background & inputs
    this.points = 0;
    this.add.tileSprite(+width / 2, +height / 2, +width, +height, sky.key);

    this.cursorKeys =
      this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
    // #endregion

    // #region Ship
    this.ship = this.physics.add.image(+width / 2, +height - 100, ship.key);

    this.ship.setCollideWorldBounds(true);

    // #endregion

    // #region Ship trail
    const trailParticles = this.add.particles(0, 0, shipTrail.key, {
      speed: 10,
      scale: { start: 0.2, end: 0 },
      blendMode: 'ADD',
    });

    trailParticles.startFollow(this.ship);
    // #endregion

    // #region Asteroid rain
    this.pointText = this.add
      .text(+width - 10, 10, `Score: ${this.points}`, {
        fontSize: '32px',
        color: '#fff',
      })
      .setOrigin(1, 0);

    this.asteroidGroup = this.physics.add.group();

    this.physics.add.collider(
      this.ship,
      this.asteroidGroup,
      (ship, asteroid) => {
        this.scene.start(constants.sceneNames.GameOverScene, {
          score: this.points,
        });
      }
    );

    this.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        const singleAsteroid: Phaser.Types.Physics.Arcade.ImageWithDynamicBody =
          this.asteroidGroup.create(
            Math.Between(20, +width - 20),
            0,
            asteroid.key
          );

        singleAsteroid.setRotation(Math.Between(0, 180));

        singleAsteroid.setVelocityY(Math.Between(50, 200));
        singleAsteroid.setAngularVelocity(Math.Between(-100, 100));

        singleAsteroid.setScale(Math.FloatBetween(0.6, 1.1));

        this.time.delayedCall(10e3, () => {
          if (singleAsteroid.active) {
            this.points++;
            this.pointText.setText(`Score: ${this.points}`);
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
      this.ship.setVelocityX(-ship.speed);
    } else if (right.isDown) {
      this.ship.setVelocityX(ship.speed);
    } else {
      this.ship.setVelocityX(0);
    }

    if (up.isDown) {
      this.ship.setVelocityY(-ship.speed);
    } else if (down.isDown) {
      this.ship.setVelocityY(ship.speed);
    } else {
      this.ship.setVelocityY(0);
    }
  }
}

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const {
    describe,
    it,
    expect,
    beforeEach,
    vi: { waitFor },
  } = import.meta.vitest;

  describe('Game', () => {
    let game: Phaser.Game;

    beforeEach(async () => {
      game = new Phaser.Game({
        ...gameConfig,
        scene: [AsteroidRainScene],
      });

      await waitFor(() => {
        if (!game.isBooted) {
          throw new Error('Not booted');
        }
      });
    });

    it('should create game', () => {
      expect(game).toBeInstanceOf(Phaser.Game);
      expect(game.isBooted).toBeTruthy();
    });
  });
}
