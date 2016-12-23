import VertexBuffer from './VertexBuffer';

let singleton;

class Core {
  initializeWebGL(canvasId) {
    const canvas = document.getElementById(canvasId);
    this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!this.gl) {
      console.log('WebGL is not supported');
    }

    VertexBuffer.initialize(this.gl);
  }

  getGL() {
    return this.gl;
  }

  clearCanvas(color) {
    this.gl.clearColor(color[0], color[1], color[2], color[3]);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}

if (!singleton) {
  console.log('new singleton');
  singleton = new Core();
}

export default singleton;
