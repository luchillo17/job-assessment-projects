import { constants } from './constants';
import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(GameOverScene.name);
  }

  create(data: { score: number }) {
    this.add.text(400, 250, 'Game Over', constants.textStyles).setOrigin(0.5);

    this.add
      .text(400, 300, `Score: ${data.score}`, constants.textStyles)
      .setOrigin(0.5);

    this.add
      .text(400, 350, 'Press SPACE to Restart', constants.textStyles)
      .setOrigin(0.5);

    this.input.keyboard?.once(
      'keydown-SPACE',
      () => {
        this.scene.start('GameScene');
      },
      this
    );
  }
}

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { describe, it, expect, beforeEach } = import.meta.vitest;
  describe('GameOverScene', () => {
    let game: Phaser.Game;

    beforeEach(() => {
      game = new Phaser.Game({
        type: Phaser.HEADLESS,
        parent: 'asteroid-game',
        scene: GameOverScene,
      });
    });

    it('should create game', () => {
      expect(game).toBeInstanceOf(Phaser.Game);
      console.log('Scene: ', game.scene.isBooted, game.scene.getScenes(false));
    });
  });
}
