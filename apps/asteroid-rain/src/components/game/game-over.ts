export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(GameOverScene.name);
  }

  create(data: { score: string }) {
    this.add
      .text(400, 250, 'Game Over', { fontSize: '32px', color: '#fff' })
      .setOrigin(0.5);

    this.add
      .text(400, 300, 'Score: ' + data.score, {
        fontSize: '32px',
        color: '#fff',
      })
      .setOrigin(0.5);
    this.add
      .text(400, 350, 'Press SPACE to Restart', {
        fontSize: '32px',
        color: '#fff',
      })
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
