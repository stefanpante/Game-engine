import Core from './engine/Core/Core';
import Camera from './engine/Camera';
import SimpleShader from './engine/SimpleShader';
import FragmentShader from './glsl/FragmentShader.glsl';
import VertexShader from './glsl/VertexShader.glsl';
import Renderable from './engine/Renderable';
import { vec2, mat4 } from 'gl-matrix';
class Game {
  constructor(canvasID) {
    Core.initializeWebGL(canvasID);
    const gl = Core.getGL();
    this.camera = new Camera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);

    this.shader = new SimpleShader(VertexShader, FragmentShader, gl);

    this.blue = new Renderable(this.shader);
    this.blue.setColor([0.25, 0.25, 0.95, 1]);

    this.red = new Renderable(this.shader);
    this.red.setColor([1, 0.25, 0.25, 1]);

    Core.clearCanvas([0.9, 0.9, 0.9, 1]);

    this.camera.setupViewProjection();
    const vpMatrix = this.camera.getViewportMatrix();

    const blueTransform = this.blue.getTransform();
    blueTransform.setPosition(20, 60);
    blueTransform.setRotation(0.2);
    blueTransform.setSize(5, 5);
    this.blue.draw(vpMatrix);

    const redTransform = this.red.getTransform();
    redTransform.setPosition(20, 60);
    redTransform.setSize(2, 2);
    this.red.draw(vpMatrix);
  }
}

const game = new Game('GLCanvas');
