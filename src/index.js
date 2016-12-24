import Core from './engine/Core/Core';
import SimpleShader from './engine/SimpleShader';
import FragmentShader from './glsl/FragmentShader.glsl';
import VertexShader from './glsl/VertexShader.glsl';
import Renderable from './engine/Renderable';

class Game {
  constructor(canvasID) {
    Core.initializeWebGL(canvasID);
    const gl = Core.getGL();
    this.shader = new SimpleShader(VertexShader, FragmentShader, gl);

    this.whiteSquare = new Renderable(this.shader);
    this.whiteSquare.setColor([1, 1, 1, 1]);

    this.redSquare = new Renderable(this.shader);
    this.redSquare.setColor([1, 0, 0, 1]);

    Core.clearCanvas([0, 0.8, 0, 1]);

    const whiteTransform = this.whiteSquare.getTransform();

    whiteTransform.setPosition(-0.25, 0.25);
    whiteTransform.setRotation(0.2);
    whiteTransform.setSize(1.2, 1.2);

    this.whiteSquare.draw();
  }
}

const game = new Game('GLCanvas');
