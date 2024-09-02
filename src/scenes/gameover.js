class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    console.log('Gameover');
    this.load.audio('gameOverSound', 'game-over-arcade-6435.mp3');

  }

  create() {
    this.scene.stop('UI');

    const musicOver = this.sound.add('gameOverSound', {
      volume: 0.5,
      loop: true
    });

    musicOver.play();
    this.add.dynamicBitmapText(
      this.sys.game.config.width / 2, 
      this.sys.game.config.height / 2 - 30, 
      'pixel', 
      'GAMEOVER', 
      20
    ).setOrigin(0.5);

    this.input.on('pointerdown', () => {
      this.exitScene();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.exitScene();
    });

    this.event = setTimeout(() => {
      this.exitScene();
    }, 5000);
  }

  exitScene() {
    clearTimeout(this.event);
    this.scene.start('Menu');
  }
}

export default GameOver;
