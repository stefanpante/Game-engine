attribute vec3 squareVertexPosition; 
uniform mat4 modelTransform;
uniform mat4 viewProjTransform;

void main(void) {
  gl_Position = viewProjTransform * modelTransform * vec4(squareVertexPosition, 1.0);
}
