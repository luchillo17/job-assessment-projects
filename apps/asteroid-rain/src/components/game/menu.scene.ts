import { constants } from './constants';

import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(constants.sceneNames.MenuScene);
  }

  create() {
    this.add
      .text(400, 300, 'Press SPACE to Start', {
        fontSize: '32px',
        color: '#fff',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once(
      'keydown-SPACE',
      () => {
        this.scene.start(constants.sceneNames.GameScene);
      },
      this
    );
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

  describe('MenuScene', () => {
    let game: Phaser.Game;

    beforeEach(async () => {
      game = new Phaser.Game({
        ...constants.gameConfig,
        scene: MenuScene,
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
