## lambda-webpack-zip
* webpack giving configs
* create tmp for webpack output
* zip tmp output and return with zip file path

### usage
``` js
pack({
  // webpack configs
  entry: "/source/code/path",
  // Specify the output file containing our bundled code
  output: {
    filename: "index.js"
  }
})
```
