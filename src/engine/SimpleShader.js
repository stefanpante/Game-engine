import VertexBuffer from './VertexBuffer';

class SimpleShader {
  constructor(vertexShaderSrc, fragmentShaderSrc, gl) {
    this.gl = gl;

    const vertexShader = this.compileShader(vertexShaderSrc, this.gl.VERTEX_SHADER, gl);
    const fragmentShader = this.compileShader(fragmentShaderSrc, this.gl.FRAGMENT_SHADER, gl);

    this.compiledShader = this.gl.createProgram();
    this.gl.attachShader(this.compiledShader, vertexShader);
    this.gl.attachShader(this.compiledShader, fragmentShader);

    this.gl.linkProgram(this.compiledShader);

    if (!gl.getProgramParameter(this.compiledShader, this.gl.LINK_STATUS)) {
      return console.log('error linking shader');
    }

    this.shaderVertexPositionAttribute = this.gl.getAttribLocation(this.compiledShader, 'aSquareVertexPosition');
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, VertexBuffer.getGLVertexRef());
    this.gl.vertexAttribPointer(this.shaderVertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
  }

  compileShader(shaderSrc, shaderType, gl) {
    const compiledShader = gl.createShader(shaderType);
    gl.shaderSource(compiledShader, shaderSrc);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
      console.log('shader compile error' + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
  }

  activateShader() {
    this.gl.useProgram(this.compiledShader);
    this.gl.enableVertexAttribArray(this.shaderVertexPositionAttribute);
  }

  getShader() {
    return this.compiledShader;
  }
}

export default SimpleShader;
