var fs = require('fs');

const replaced = "import RNFetchBlob from '../index.js'";
const replacement =
  "import {NativeModules} from 'react-native';\nconst RNFetchBlob = NativeModules.RNFetchBlob";

const files = [
  'node_modules/rn-fetch-blob/polyfill/Fetch.js',
  'node_modules/rn-fetch-blob/polyfill/Blob.js',
  'node_modules/rn-fetch-blob/polyfill/XMLHttpRequest.js',
];

files.forEach(file => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }

    var result = data.replace(new RegExp(replaced, 'g'), replacement);
    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) {
        return console.error(err);
      }
    });
  });
});
