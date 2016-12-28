import keys from './keys';

let singleton;

class Input {
  constructor() {
    this.keyPreviousState = Array(keys.LASTKEY).fill(false);
    this.keysPressed = Array(keys.LASTKEY).fill(false);
    this.keysClicked = Array(keys.LASTKEY).fill(false);

    window.addEventListener('keyup', event => this.onKeyUp(event));
    window.addEventListener('keydown', event => this.onKeyDown(event));
  }

  onKeyDown(event) {
    this.keysPressed[event.keyCode] = true;
  }

  onKeyUp() {
    this.keysPressed[event.keyCode] = false;
  }

  update() {
    for (let index = 0; index < keys.LASTKEY; index++) {
      this.keysClicked[index] = (!this.keyPreviousState[index] && this.keysPressed[index]);
      this.keyPreviousState = this.keysPressed[index];
    }
  }
  // possible improvement, trigger callbacks on key press
  isKeyPressed(keyCode) {
    return this.keysPressed[keyCode];
  }

  isKeyClicked(keyCode) {
    return this.keysClicked[keyCode];
  }
}

if (!singleton) {
  singleton = new Input();
}

export default singleton;
