class Snake {

  constructor(scene) {
    this.scene = scene;
    this.body = [];
    this.direction = 'left';
    this.timer = 0;
    this.oldDirection = 'right';

    for (let i = 0; i < 3; i++) {
      this.body.push(
        this.scene.physics.add.image(100 + i * 10, 100, 'body')
            .setOrigin(0)
      );
    }

    for (let i = 1; i < 10; i++) {
      this.scene.physics.add.collider(this.body[0], this.body[i], () => this.crash())
    }
  }

  changeDirection(newDirection) {
    if (this.oldDirection !== newDirection) {
      this.direction = newDirection;
    }
  }

  grow() {
    const lastSegment = this.body[this.body.length - 1];
    const newSegment = this.scene.physics.add.image(lastSegment.x, lastSegment.y, 'body').setOrigin(0);
    this.body.push(newSegment);
    this.scene.physics.add.collider(this.body[0], newSegment, () => this.crash())
  }

  crash() {
    this.scene.scene.start('GameOver');
  }

  update(time) {
    if (time > this.timer) {
      for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;

        this.body[this.body.length - 1 - i].x = Phaser.Math.Wrap(this.body[this.body.length - 1 - i].x,
            0,
            this.scene.sys.game.config.width);
        this.body[this.body.length - 1 - i].y = Phaser.Math.Wrap(this.body[this.body.length - 1 - i].y,
            20,
            this.scene.sys.game.config.height);
      }
      switch(this.direction) {
        case 'right':
          this.body[0].x += 10;
          this.oldDirection = 'left';
          break;
        case 'left':
          this.body[0].x -= 10;
          this.oldDirection = 'right';
          break;
        case 'up':
          this.body[0].y -= 10;
          this.oldDirection = 'down';
          break;
        case 'down':
          this.body[0].y += 10;
          this.oldDirection = 'up';
      }
      this.timer = time + 150;
    }
  }
}

export default Snake;
