export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: MenuScene.name });
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
        this.scene.start('GameScene');
      },
      this
    );
  }
}
