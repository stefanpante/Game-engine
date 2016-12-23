import Core from './engine/Core';
import SimpleShader from './engine/SimpleShader';
import FragmentShader from './glsl/FragmentShader.glsl';
import VertexShader from './glsl/VertexShader.glsl';
class Game {
  constructor(canvasID) {
    Core.initializeWebGL(canvasID);
    Core.clearCanvas([0, 0.8, 0, 1]);
    const gl = Core.getGL();
    this.shader = new SimpleShader(VertexShader, FragmentShader, gl);
    this.shader.activateShader();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

const game = new Game('GLCanvas');
