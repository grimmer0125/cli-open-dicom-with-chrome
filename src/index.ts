#!/usr/bin/env node

const shell = require('shelljs');
const os = require('os');
const path = require('path');
const fs = require('fs');

// ref: https://github.com/dividab/tsconfig-paths/issues/61
// test module resoltion

import sum from '@work/test';

// import sum from '@work/test';
const kk = sum(1, 2);
console.log('kk:', kk);

function getFilePath() {
  // node index.ts fileName, or yarn dev fileName, or node dicom fileName
  if (process.argv.length > 2) {
    let fileURL = '';

    process.argv.forEach((fileOrFolderPath, index) => {
      if (index < 2) {
        return;
      }
      const absPath = path.resolve(fileOrFolderPath); // process.cwd(). process path

      try {
        const stats = fs.lstatSync(absPath);
        if (stats.isDirectory()) {
          const files = fs.readdirSync(absPath);
          files.forEach((file: string) => {
            const fileAbsPath = `${absPath}/${file}`;
            if (!fs.lstatSync(fileAbsPath).isDirectory()) {
              if (!fileURL) {
                fileURL = '#';
              }
              fileURL += `file://${fileAbsPath}`;
            }
          });
        } else {
          if (!fileURL) {
            fileURL = '#';
          }
          fileURL += `file://${absPath}`;
        }
      } catch (e) {
        console.log('e:', e);
      }
    });

    return fileURL;
  }
  return '';
}

const fileURL = getFilePath();
const extensionID = 'ehppmcooahfnlfhhcflpkcjmonkoindc';
const extensionURL = `chrome-extension://${extensionID}/index.html`;

const chromeURL = `${extensionURL}${fileURL}`;

const platform = os.platform();
if (platform === 'darwin') {
  const command = `open -n -a "Google Chrome" --args  "${chromeURL}"`;
  // Run external tool synchronously
  if (shell.exec(command).code !== 0) {
    shell.echo('Error: Launch Chrome failed');
    shell.exit(1);
  }
} else if (platform === 'linux') {
  let command = '';
  if (shell.which('google-chrome')) {
    command = `google-chrome "${chromeURL}"`;
  } else if (shell.which('chromium-browser')) {
    command = `chromium-browser "${chromeURL}"`;
  }

  // Run external tool synchronously
  if (shell.exec(command).code !== 0) {
    shell.echo('Error: Launch Chrome failed');
    shell.exit(1);
  }
} else {
  // Not implement yet "win32"
}
