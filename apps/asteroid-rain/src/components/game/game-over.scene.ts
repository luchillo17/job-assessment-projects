import Phaser from 'phaser';

import { constants } from './constants';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(constants.sceneNames.GameOverScene);
  }

  create(data: { score: number }) {
    this.add.text(400, 250, 'Game Over', constants.textStyles).setOrigin(0.5);

    this.add
      .text(400, 300, `Score: ${data.score}`, constants.textStyles)
      .setOrigin(0.5);

    this.add
      .text(400, 350, 'Press SPACE to Restart', constants.textStyles)
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start(constants.sceneNames.GameScene);
    });
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

  describe('GameOverScene', () => {
    let game: Phaser.Game;

    beforeEach(async () => {
      game = new Phaser.Game({
        ...constants.gameConfig,
        scene: GameOverScene,
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
