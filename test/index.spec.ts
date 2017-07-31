// tslint:disable:no-console
import * as fs from "fs";
import { pack } from "../src";
import * as path from "path";
import * as tmp from "tmp";
import { Extract } from "unzip";
import * as chai from "chai";

const expect = chai.expect;

describe("pack", () => {
  it("should pack", function() {
    this.timeout(10000);
    // pack, then unpack, requre it to test if code is functional
    const tmpdir = tmp.dirSync({prefix: "test_"});
    return pack({
      entry: path.join(__dirname, "./fixtures/test-folder"),
      // Specify the output file containing our bundled code
      output: {
        filename: "index.js"
      }
    })

    // unzip
    .then(zipPath => new Promise((resolve, reject) => {
      const reader = fs.createReadStream(zipPath);
      reader.on("error", reject);

      // extractor
      const extract = Extract({path: tmpdir.name});
      extract.on("close", () => resolve());
      extract.on("error", reject);

      // pipe
      reader.pipe(extract);
    }))

    // test require
    .then(() => {
      const testModule = require(tmpdir.name);
      expect(testModule.test()).to.be.eql("test");
      expect(testModule.testmod).to.be.eql("testmod");
    });
  });
});
