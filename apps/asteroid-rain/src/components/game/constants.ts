import Phaser from 'phaser';

const type = !import.meta.env.TEST ? Phaser.AUTO : Phaser.HEADLESS;

export const constants = {
  gameConfig: {
    type,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
    },
  } as Phaser.Types.Core.GameConfig,
  textStyles: {
    fontSize: '32px',
    color: '#fff',
  } as Phaser.Types.GameObjects.Text.TextStyle,
  sceneNames: {
    MenuScene: 'MenuScene',
    GameScene: 'GameScene',
    GameOverScene: 'GameOverScene',
  },
  assets: {
    phaserAssetsBaseUrl: 'https://labs.phaser.io',
    asteroid: {
      key: 'asteroid',
      url: 'assets/games/asteroids/asteroid1.png',
    },
    ship: {
      key: 'ship',
      url: 'assets/sprites/ship.png',
      speed: 150,
    },
    shipTrail: {
      key: 'shipTrail',
      url: 'assets/particles/red.png',
    },
    sky: {
      key: 'sky',
      url: 'assets/skies/nebula.jpg',
    },
  },
};
