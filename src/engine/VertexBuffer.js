let singleton;

class VertexBuffer {
  constructor() {
    this.verticesOfSquare = [
      0.5, 0.5, 0.0,
      -0.5, 0.5, 0.0,
      0.5, -0.5, 0.0,
      -0.5, -0.5, 0.0
    ];
  }

  initialize(gl) {
    this.squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesOfSquare), gl.STATIC_DRAW);
  }

  getGLVertexRef() {
    return this.squareVertexBuffer;
  }
}

if (!singleton) {
  singleton = new VertexBuffer();
}

export default singleton;
