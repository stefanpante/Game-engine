import { mat4, vec3 } from 'gl-matrix';
class Transform {
  constructor() {
    this.position = vec3.fromValues(0, 0, 0);
    this.scale = vec3.fromValues(1, 1, 1);
    this.rotation = 0.0;
  }

  setXPosition(x) {
    const y = this.position[1];
    this.position = vec3.fromValues(x, y, 0);
  }

  getXPosition() {
    return this.position[0];
  }

  setYPosition(y) {
    const x = this.position[0];
    this.position = vec3.fromValues(x, y, 0);
  }

  getYPosition() {
    return this.position[1];
  }

  setPosition(x, y) {
    this.setXPosition(x);
    this.setYPosition(y);
  }

  getPosition() {
    return this.position;
  }

  setWidth(width) {
    const height = this.scale[1];
    this.scale = vec3.fromValues(width, height, 1);
  }

  setHeight(height) {
    const width = this.scale[0];
    this.scale = vec3.fromValues(width, height, 1);
  }

  setSize(width, height) {
    this.setWidth(width);
    this.setHeight(height);
  }

  setRotation(rotation) {
    this.rotation = rotation;
    while (this.rotation > 2 * Math.PI) {
      this.rotation -= (2 * Math.PI);
    }
  }

  getTransformationMatrix() {
    const matrix = mat4.create();

    mat4.translate(matrix, matrix, this.position);
    mat4.rotateZ(matrix, matrix, this.rotation);
    mat4.scale(matrix, matrix, this.scale);

    return matrix;
  }
}

export default Transform;
