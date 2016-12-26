import VertexBuffer from './Core/VertexBuffer';
import Core from './Core/Core';
class SimpleShader {
  constructor(vertexShaderSrc, fragmentShaderSrc, gl) {

    const vertexShader = this.compileShader(vertexShaderSrc, gl.VERTEX_SHADER, gl);
    const fragmentShader = this.compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER, gl);

    this.compiledShader = gl.createProgram();
    gl.attachShader(this.compiledShader, vertexShader);
    gl.attachShader(this.compiledShader, fragmentShader);

    gl.linkProgram(this.compiledShader);

    if (!gl.getProgramParameter(this.compiledShader, gl.LINK_STATUS)) {
      return console.log('error linking shader');
    }

    this.shaderVertexPositionAttribute = gl.getAttribLocation(this.compiledShader, 'squareVertexPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.shaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    this.pixelColor = gl.getUniformLocation(this.compiledShader, 'pixelColor');
    this.modelTransform = gl.getUniformLocation(this.compiledShader, 'modelTransform');
    this.viewProjTransform = gl.getUniformLocation(this.compiledShader, 'viewProjTransform');
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

  activateShader(pixelColor, viewPort) {
    const gl = Core.getGL();
    gl.useProgram(this.compiledShader);
    gl.uniformMatrix4fv(this.viewProjTransform, false, viewPort);
    gl.enableVertexAttribArray(this.shaderVertexPositionAttribute);
    gl.uniform4fv(this.pixelColor, pixelColor);
  }

  getShader() {
    return this.compiledShader;
  }

  loadObjectTransform(modelTransform) {
    const gl = Core.getGL();
    gl.uniformMatrix4fv(this.modelTransform, false, modelTransform);
  }
}

export default SimpleShader;
