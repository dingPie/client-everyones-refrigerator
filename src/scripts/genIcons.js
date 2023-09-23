/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

function findSVGFiles(dirPath, fileList) {
  fileList = fileList || [];

  const files = fs.readdirSync(dirPath);

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      findSVGFiles(filePath, fileList);
    } else if (path.extname(filePath) === '.svg') {
      const baseName = path.basename(filePath, '.svg');
      const iconPath = filePath.replace(`../assets/`, '');
      const iconName = convertToPascalCase(baseName + 'Icon');
      const iconExportPath = `export { default as ${iconName} } from '@/assets/${iconPath}';`;
      fileList.push(iconExportPath);
    }
  }
  return fileList;
}
const directoryPath = '../assets/icons';
const outputPath = '../generated/icons';
const svgFiles = findSVGFiles(directoryPath);

if (fs.existsSync(outputPath)) {
  fs.rmSync(outputPath, { recursive: true });
}

fs.mkdirSync(outputPath, (err) => {
  if (err) throw err;
});

fs.writeFileSync(outputPath + '/icons.ts', svgFiles.join('\n'), 'utf8');

function convertToPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
      return word.toUpperCase();
    })
    .replace(/(-|_)/g, '')
    .replace(/\s+/g, '');
}
