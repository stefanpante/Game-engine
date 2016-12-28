import Input from './Input';

class GameLoop {
  constructor() {
    this.fps = 60;
    this.millisPerFrame = 1000 / 60;
    this.previousTime = null;
    this.currentTime = null;
    this.lagTime = 0;
    this.active = false;
    this.game = null;
  }

  start(game) {
    this.game = game;
    this.previousTime = Date.now();
    this.active = true;
    requestAnimationFrame(() => this.runLoop());
  }

  runLoop() {
    if (this.active) {
      // reque
      requestAnimationFrame(() => this.runLoop());
      this.currenTime = Date.now();
      this.elapsedTime = this.currenTime - this.previousTime;
      this.previousTime = this.currenTime;
      this.lagTime += this.elapsedTime;

      while ((this.lagTime >= this.millisPerFrame) && this.active) {
        Input.update();
        this.game.update();
        this.lagTime -= this.millisPerFrame;
      }

      this.game.draw();
    }
  }
}

export default GameLoop;
