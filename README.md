## lambda-webpack-zip
build for aws-lambda, webpack your entry, then zip it

## Install
``` sh
npm install lambda-webpack-zip
yarn add lambda-webpack-zip
```

## Features
* customized webpack configs
* create tmp file for webpack built code and zip code, ensure them to be deleted after process exit

### Usage
``` js
const {pack} = require("lambda-webpack-zip");
pack({
  // webpack configs
  entry: "/source/code/path",
  // Specify the output file containing our bundled code
  output: {
    filename: "index.js"
  }
})
.then(zipFilePath => {
  // upload zipFilePath
});
```

## Powered By Canner
[Canner](https://www.canner.io/)
