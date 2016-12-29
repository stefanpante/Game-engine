import Core from './engine/Core/Core';
import TextFileLoader from './engine/Core/Resources/TextFileLoader';
import SceneParser from './util/SceneParser';
import GameLoop from './engine/Core/GameLoop';
import Input from './engine/Core/Input';
import keys from './engine/Core/keys';
import { vec2 } from 'gl-matrix';
class Game {
  constructor(canvasID) {
    Core.initialize(canvasID);
    this.sceneFile = 'assets/scene.json';
  }

  loadScene() {
    TextFileLoader.loadTextFile(this.sceneFile, TextFileLoader.fileTypes.JSON);
  }

  initialize() {
    const sceneParser = new SceneParser(this.sceneFile);

    this.camera = sceneParser.parseCamera();
    this.squares = sceneParser.parseSquares();
  }

  update() {
    const whiteTransform = this.squares[0].getTransform();
    const deltaX = 0.05;

    if (Input.isKeyPressed(keys.RIGHT)) {
      whiteTransform.translateXPosition(deltaX);
      whiteTransform.addRotation(Math.PI / 180);
    }

    if (whiteTransform.getXPosition() > 30) {
      whiteTransform.setPosition(10, 60);
    }

    const redTransform = this.squares[1].getTransform();
    if (Input.isKeyPressed(keys.DOWN)) {
      redTransform.increaseSize(0.05);
    }

    if (redTransform.getWidth() > 5) {
      redTransform.setSize(2, 2);
    }

  }

  draw() {
    Core.clearCanvas([0.9, 0.9, 0.9, 1]);

    this.camera.setupViewProjection();
    const vpMatrix = this.camera.getViewportMatrix();
    this.squares.forEach(square => square.draw(vpMatrix));
  }
}

new Game('GLCanvas');

