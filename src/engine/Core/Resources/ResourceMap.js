let singleton;

class MapEntry {
  constructor(name) {
    this.asset = name;
  }
}

class ResourceMap {
  constructor() {
    this.resourceMap = {};
    this.numOutstandingLoads = 0;
    this.loadCompleteCallback = null;
  }

  checkForAllLoadCompleted() {
    if (this.numOutstandingLoads === 0 && this.loadCompleteCallback) {
      this.loadCompleteCallback();
      this.loadCompleteCallback = null;
    }
  }

  setLoadCompleteCallback(callback) {
    this.loadCompleteCallback = callback;
    this.checkForAllLoadCompleted();
  }

  asynLoadRequest(name) {
    this.resourceMap[name] = new MapEntry(name);
    this.numOutstandingLoads++;
  }

  isAssetLoaded(name) {
    return this.resourceMap.hasOwnProperty(name);
  }

  retrieveAsset(name) {
    if (this.resourceMap[name]) {
      return this.resourceMap[name].asset;
    }
  }

  unloadAsset(name) {
    delete this.resourceMap[name];
  }

  asyncLoadCompleted(name, loadedAsset) {
    if (!this.isAssetLoaded(name)) {
      console.log(`asyncLoadCompleted:${name} not in map!`);
    }

    this.resourceMap[name].asset = loadedAsset;
    this.numOutstandingLoads--;
    this.checkForAllLoadCompleted();
  }
}

if (!singleton) {
  singleton = new ResourceMap();
}

export default singleton;
