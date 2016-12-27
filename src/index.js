import Core from './engine/Core/Core';
import Camera from './engine/Camera';
import SimpleShader from './engine/SimpleShader';
import FragmentShader from './glsl/FragmentShader.glsl';
import VertexShader from './glsl/VertexShader.glsl';
import Renderable from './engine/Renderable';
import GameLoop from './engine/Core/GameLoop';
import { vec2, mat4 } from 'gl-matrix';
class Game {
  constructor(canvasID) {
    Core.initializeWebGL(canvasID);
    this.camera = new Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);
    this.camera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.colorShader = new SimpleShader(VertexShader, FragmentShader, Core.getGL());

    this.whiteSquare = new Renderable(this.colorShader);
    this.whiteSquare.setColor([1, 1, 1, 1]);

    this.redSquare = new Renderable(this.colorShader);
    this.redSquare.setColor([1, 0, 0, 1]);

    const whiteTransform = this.whiteSquare.getTransform();
    whiteTransform.setPosition(20, 60);
    whiteTransform.setRotation(0.2);
    whiteTransform.setSize(5, 5);

    const redTransform = this.redSquare.getTransform();
    redTransform.setPosition(20, 60);
    redTransform.setSize(2, 2);

    const loop = new GameLoop();

    loop.start(this);
  }

  update() {
    const whiteTransform = this.whiteSquare.getTransform();
    const deltaX = 0.05;

    if (whiteTransform.getXPosition() > 30) {
      whiteTransform.setPosition(10, 60);
    }

    whiteTransform.translateXPosition(deltaX);
    whiteTransform.addRotation(Math.PI / 180);

    const redTransform = this.redSquare.getTransform();
    if (redTransform.getWidth() > 5) {
      redTransform.setSize(2, 2);
    }

    redTransform.increaseSize(0.05);
  }

  draw() {
    Core.clearCanvas([0.9, 0.9, 0.9, 1]);

    this.camera.setupViewProjection();
    const vpMatrix = this.camera.getViewportMatrix();
    this.whiteSquare.draw(vpMatrix);
    this.redSquare.draw(vpMatrix);
  }
}

new Game('GLCanvas');

