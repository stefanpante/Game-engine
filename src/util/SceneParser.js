import ResourceMap from '../engine/Core/Resources/ResourceMap';
import DefaultResources from '../engine/Core/Resources/DefaultResources';
import Camera from '../engine/Camera';
import Renderable from '../engine/Renderable';
import { vec2 } from 'gl-matrix';

class SceneParser {
  constructor(sceneFilePath) {
    this.sceneJSON = ResourceMap.retrieveAsset(sceneFilePath);
  }

  parseCamera() {
    const camJSON = this.sceneJSON.camera;
    const center = vec2.fromValues(camJSON.center.x, camJSON.center.y);
    const camera = new Camera(center, camJSON.width, camJSON.viewport);
    camera.setBackgroundColor(camJSON.backgroundColor);

    return camera;
  }

  parseSquare(squareJSON) {
    const square = new Renderable(DefaultResources.getConstColorShader());

    square.setColor(squareJSON.color);

    const transform = square.getTransform();
    transform.setPosition(squareJSON.x, squareJSON.y);
    transform.setRotation(squareJSON.rotation);
    transform.setSize(squareJSON.width, squareJSON.height);
    square.setTransfrom(transform);

    return square;
  }
  parseSquares() {
    const squaresJSON = this.sceneJSON.squares;
    return squaresJSON.map(this.parseSquare);
  }
}

export default SceneParser;
