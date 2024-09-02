class Food {
  constructor(scene) {
    this.scene = scene;
    this.food = this.scene.physics.add.group({
      key: 'food',
      setXY: {
        x: 30,
        y: 30,
      }
    });
    this.food.getChildren()[0].setOrigin(0).setDepth(-1);
  }

  createFood() {
    const gameConfig = this.scene.sys.game.config;
    let x = Phaser.Math.Between(30, gameConfig.width - 30);
    let y = Phaser.Math.Between(30, gameConfig.height - 30);

    x = Phaser.Math.Snap.To(x, 10);
    y = Phaser.Math.Snap.To(y, 10);
    
    this.food.getChildren()[0].destroy();

    this.food.create(x, y, 'food');
    this.food.getChildren()[0].setOrigin(0).setDepth(-1);
  }
}

export default Food;
