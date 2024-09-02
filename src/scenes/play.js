import Snake from "../gameobjects/Snake.js";
import Food from "../gameobjects/Food.js";

class Play extends Phaser.Scene {
  constructor() {
    super('Play');
  }

  preload() {
    console.log('Play scene');
    this.load.audio('backgroundMusic', 'AdhesiveWombat_-_Night_Shade_NO_COPYRIGHT_8-bit_Music_(youconvert.net).mp3');
    this.load.audio('powerUpMusic', 'AdhesiveWombat_-_Night_Shade_NO_COPYRIGHT_8-bit_Music_(youconvert.net).mp3');

    this.snake = new Snake(this);
    this.food = new Food(this);
  }

  create() {
    this.scene.launch('UI');
    const sceneUI = this.scene.get('UI');

    const music = this.sound.add('backgroundMusic', {
      volume: 0.5,
      loop: true
    });

    const powerupmusic = this.sound.add('powerUpMusic', {
      volume: 0.5,
    });

    music.play();
    this.input.keyboard.on('keydown-RIGHT', () => {
      this.snake.changeDirection('right');
    });

    this.input.keyboard.on('keydown-LEFT', () => {
      this.snake.changeDirection('left');
    });

    this.input.keyboard.on('keydown-UP', () => {
      this.snake.changeDirection('up');
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      this.snake.changeDirection('down');
    });

    this.physics.add.collider(this.snake.body[0], this.food.food, () => this.snakeEat(sceneUI));
  }

  update(time) {
    this.snake.update(time);
  }

  snakeEat(sceneUI) {
    this.food.createFood();
    this.snake.grow();
    sceneUI.addPoint();
  }
}

export default Play;
