#!/usr/bin/env node

const shell = require('shelljs');
const os = require('os');
const path = require('path');
const fs = require('fs');

// TODO1:
// 1. [done] read single file, with file name parameter
// 2. [done] global npm package
// 3. [done] use "dicom" to open chrome extension
// TODO2:
// 1. done] read folder parameter, "./"" or ${some folder}
// 2. (optional) read multiple files, a_file b_file

function getFilePath() {
  // node index.ts fileName, or yarn dev fileName, or dicom fileName?
  if (process.argv.length > 2) {
    const fileOrFolderPath = process.argv[2];
    const absPath = path.resolve(fileOrFolderPath); // process.cwd(). process path

    let fileURL = '';
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
      fileURL += `#file://${absPath}`;
    }

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
