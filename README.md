# CLI To Open DICOM with Chrome

## Installation package globally

1. You need to install Node.js first, https://nodejs.org/en/

2. Intall this package,
   either `npm install -g cli-open-dicom-with-chrome` or `yarn global add cli-open-dicom-with-chrome`.
   If you encounter permission issue when using `npm install`, try to add `sudo` again, `sudo npm install -g cli-open-dicom-with-chrome`

## Usage

**Install DICOM image viewer (Chrome extension)**

Please install chrome extension, https://chrome.google.com/webstore/detail/dicom-image-viewer/ehppmcooahfnlfhhcflpkcjmonkoindc first. It can allow you to browse online and offline local files.
Keep in mind that you need to enable `Allow access to file URLs` in this chrome extension detail page.

### Command example in your terminal

1. `dicom` to launch the DICOM image viewer
2. `dicom ${file1}, ${file2}, ${folder1}` to add file/folder arguments to ask the DICOM image viewer to browse these files.
