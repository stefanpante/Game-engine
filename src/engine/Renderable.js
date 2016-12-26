
import Core from './Core/Core';
import Transform from './Transform';
class Renderable {
  constructor(shader) {
    this.shader = shader;
    this.color = [1, 1, 1, 1];
    this.transform = new Transform();
  }

  draw(viewPort) {
    const gl = Core.getGL();

    this.shader.activateShader(this.color, viewPort);
    this.shader.loadObjectTransform(this.transform.getTransformationMatrix());

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  getTransform() {
    return this.transform;
  }

  setTransform(transform) {
    this.transform = transform;
  }

}

export default Renderable;
