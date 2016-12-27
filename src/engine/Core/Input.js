import keys from './keys';

class Input {
  constructor() {
    this.keyPreviousState = Array(keys.LASTKEY).fill(false);
    this.isKeyPressed = Array(keys.LASTKEY).fill(false);
    this.isKeyClicked = Array(keys.LASTKEY).fill(false);

    window.addEventListener('keyup', event => this.onKeyUp(event));
    window.addEventListener('keydown', event => this.onKeyDown(event));
  }

  onKeyDown(event) {
    this.isKeyPressed[event.keyCode] = true;
  }

  onKeyUp() {
    this.isKeyPressed[event.keyCode] = false;
  }

  update() {
    for (let index = 0; index < keys.LASTKEY; index++) {
      this.isKeyClicked[index] = (!this.keyPreviousState[index] && this.isKeyPressed[index]);
      this.keyPreviousState = this.isKeyPressed[index];
    }
  }
  // possible improvement, trigger callbacks on key press
  isKeyPressed(keyCode) {
    return this.isKeyPressed[keyCode];
  }

  isKeyClicked(keyCode) {
    return this.isKeyClicked[keyCode];
  }
}

export default Input;
