import ResourceMap from './ResourceMap';


class TextFileLoader {
  constructor() {
    this.fileTypes = Object.freeze({
      XML_FILE: 0,
      TEXT_FILE: 1
    });
  }
  loadTextFile(fileName, fileType, callback) {

    if (ResourceMap.isAssetLoaded(fileName)) {
      return callback(null, fileName);
    }

    fetch(fileName)
      .then(response => {
        if (response.status !== 200) {
          return callback(new Error('load failed'));
        }

        let fileContent = response.responseText;

        if (fileType === this.fileTypes.XML_FILE) {
          const parser = new DOMParser();
          fileContent = parser.parseFromString(fileContent, 'text/xml');
        }

        ResourceMap.asyncLoadCompleted(fileName, fileContent);

        if (typeof callback === 'function') {
          return callback(null, fileName);
        }
      });
  }
}

export default TextFileLoader;
