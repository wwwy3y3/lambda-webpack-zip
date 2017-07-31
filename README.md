## lambda-webpack-zip
[![npm Version](https://img.shields.io/npm/v/lambda-webpack-zip.svg?style=flat-square)](https://www.npmjs.org/package/lambda-webpack-zip)
[![Build Status](https://travis-ci.org/Canner/lambda-webpack-zip.svg?branch=master)](https://travis-ci.org/Canner/lambda-webpack-zip)

Build for aws-lambda, webpack your entry, then zip it

## Install
``` sh
npm install lambda-webpack-zip
yarn add lambda-webpack-zip
```

## Features
* customized webpack configs
* create tmp file for webpack built code and zip file, ensure them to be deleted after process exit
* Typescript support

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
