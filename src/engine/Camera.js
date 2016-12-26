
import Core from './Core/Core';
import { mat4 } from 'gl-matrix';

class Camera {
  constructor(center, width, viewport) {
    this.center = center;
    this.width = width;
    this.viewport = viewport; // [x, y, width, height]

    this.nearPlane = 0;
    this.farPlane = 1000;

    this.viewMatrix = mat4.create();
    this.projMatrix = mat4.create();
    this.viewPortMatrix = mat4.create();

    this.bgColor = [0.8, 0.8, 0.8, 1];
  }

  setCenter(x, y) {
    this.center[0] = x;
    this.center[1] = y;
  }

  getCenter() {
    return this.center;
  }

  setWidth(width) {
    this.width = width;
  }

  getWidth() {
    return this.width;
  }

  setViewport(viewport) {
    this.viewport = viewport;
  }

  getViewport() {
    return this.viewport;
  }

  setBackgroundColor(color) {
    this.bgColor = color;
  }

  getBackgroundColor() {
    return this.bgColor;
  }

  getViewportMatrix() {
    return this.viewPortMatrix;
  }

  setupViewProjection() {
    const gl = Core.getGL();

    gl.viewport.apply(gl, this.viewport);
    gl.scissor.apply(gl, this.viewport);
    gl.clearColor.apply(gl, this.bgColor);

    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    mat4.lookAt(this.viewMatrix,
      [this.center[0], this.center[1], 10],
      [this.center[0], this.center[1], 0],
      [0, 1, 0]);

    const halfWidth = this.width * 0.5;
    const halfHeight = halfWidth * this.viewport[3] / this.viewport[2];

    mat4.ortho(this.projMatrix, -halfWidth, halfWidth, -halfHeight, halfHeight,
      this.nearPlane, this.farPlane);
    mat4.multiply(this.viewPortMatrix, this.projMatrix, this.viewMatrix);
  }
}

export default Camera;
