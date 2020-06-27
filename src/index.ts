#!/usr/bin/env node

const shell = require('shelljs');
const os = require('os');
var path = require('path');

// TODO1:
// 1. [done] read single file, with file name parameter
// 2. [done] global npm package
// 3. use "dicom" to open chrome extension
// TODO2:
// 1. read folder parameter, "./"" or ${some folder}
// 2. (optional) read multiple files, a_file b_file

// node index.ts fileName, or yarn dev fileName
// console.log(process.argv);
let filePath = '';
if (process.argv.length > 2) {
  filePath = process.argv[2];
  filePath = path.resolve(filePath); // process.cwd(). process path
  // console.log(filePath);

  // if (fileName.indexOf('/') === -1) {
  //   // TODO: no file path included, should add
  //   console.log(__dirname); // script path, https://flaviocopes.com/node-get-current-folder/
  //   fileName = `${__dirname}/${fileName}`;
  // }
}

// https://chrome.google.com/webstore/detail/dicom-image-viewer/ehppmcooahfnlfhhcflpkcjmonkoindc
const extensionURL =
  'chrome-extension://ehppmcooahfnlfhhcflpkcjmonkoindc/index.html';
let fileURL = '';
if (filePath) {
  fileURL = `#file://${filePath}`;
}
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
