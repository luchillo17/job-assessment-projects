import { AsteroidRainScene } from './asteroid-rain.scene';
import { constants } from './constants';
import { GameOverScene } from './game-over.scene';
import { MenuScene } from './menu.scene';

const { gameConfig } = constants;

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  ...gameConfig,
  parent: 'asteroid-game',
  scene: [MenuScene, AsteroidRainScene, GameOverScene],
};
