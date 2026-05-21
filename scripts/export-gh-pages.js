const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const rm = promisify(fs.rm);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const readdir = promisify(fs.readdir);

const root = process.cwd();
const outDir = path.join(root, "out");

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  if (fs.existsSync(outDir)) {
    await rm(outDir, { recursive: true, force: true });
  }

  const appExportDir = path.join(root, ".next", "server", "app");
  if (!fs.existsSync(appExportDir)) {
    throw new Error(`Expected exported HTML output at ${appExportDir}. Run npm run build first.`);
  }

  await copyDir(appExportDir, outDir);

  const staticDir = path.join(root, ".next", "static");
  if (fs.existsSync(staticDir)) {
    await copyDir(staticDir, path.join(outDir, "_next", "static"));
  }

  const publicDir = path.join(root, "public");
  if (fs.existsSync(publicDir)) {
    await copyDir(publicDir, outDir);
  }

  const notFoundSrc = path.join(appExportDir, "_not-found.html");
  if (fs.existsSync(notFoundSrc)) {
    await copyFile(notFoundSrc, path.join(outDir, "404.html"));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
