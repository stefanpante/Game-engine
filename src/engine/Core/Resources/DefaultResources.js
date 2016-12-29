import Core from '../Core';
import SimpleShader from '../../SimpleShader';
import FragmentShader from '../../../glsl/FragmentShader.glsl';
import VertexShader from '../../../glsl/VertexShader.glsl';

let singleton;

class DefaultResources {
  constructor() {
    this.constColorShader = new SimpleShader(VertexShader, FragmentShader, Core.getGL());
  }

  getConstColorShader() {
    return this.constColorShader;
  }
}

if (!singleton) {
  singleton = new DefaultResources();
}
export default singleton;
