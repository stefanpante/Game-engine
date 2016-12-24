attribute vec3 squareVertexPosition; 
uniform mat4 modelTransform;

void main(void) {
  gl_Position = modelTransform * vec4(squareVertexPosition, 1.0);
}
