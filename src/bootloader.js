class BootLoader extends Phaser.Scene {
  constructor() {
    super('Bootloader');
  }

  preload() {
    console.log('Hello, I am Bootloader');
    
    // Load assets using load.image()
    this.load.image('body', './assets/body.png');
    this.load.image('food', './assets/food.png');
    this.load.image('board', './assets/tablero.png');

    // Load Font JSON Config
    this.load.json('fontJSON', './assets/font/font.json');
    this.load.image('font', './assets/font/font.png');

    this.load.on('complete', () => {
      // Get the fontJson from the cache
      const fontJson = this.cache.json.get('fontJSON');
      this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJson));
      console.log(fontJson);

      this.scene.start('Menu');
    });
  }
}

export default BootLoader;
