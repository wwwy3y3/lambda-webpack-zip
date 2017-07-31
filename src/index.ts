// tslint:disable:no-console
import * as tmp from "tmp";
import * as webpack from "webpack";
import * as fs from "fs";
import * as archiver from "archiver";

const webpackBuild = (config: webpack.Configuration, destDir: string): PromiseLike<void> =>
  new Promise((resolve, reject) => {
    // force output path, so we can zip it afterward
    config.output.path = destDir;
    config.output.libraryTarget = "commonjs";

    // force target to be node, since it's a lambda
    config.target = "node";
    webpack(config, (err, stats) => {
      if (err) return reject(err);

      const info = stats.toJson();

      if (stats.hasErrors()) {
        reject(new Error(info.errors));
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      resolve();
    });
  });

export const zipSource = (sourceDir: string, destPath: string): PromiseLike<tmp.SynchrounousResult> =>
  new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(destPath, {
      flags: "w",
      defaultEncoding: "binary"
    });

    fileStream.on("close", () => {
      resolve();
    });

    const archive = archiver("zip");
    archive.on("error", err => {
      reject(err);
    });
    archive.on("entry", data => {
      console.log(`${data.name} added to zip`);
    });

    archive.pipe(fileStream);
    // leave empty string in order to match the type, otherwise it could be false
    archive.directory(sourceDir, "").finalize();
  });

export async function pack(config: webpack.Configuration): Promise<string> {
  const buildDir = tmp.dirSync({prefix: "cnfn_"});
  await webpackBuild(config, buildDir.name);

  const zipDestFile = tmp.fileSync({prefix: "canner-functions", postfix: ".zip"});
  await zipSource(buildDir.name, zipDestFile.name);
  return zipDestFile.name;
}
