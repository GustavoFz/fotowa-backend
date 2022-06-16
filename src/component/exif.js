const piexif = require("piexifjs");
const fs = require("fs");

const getBase64DataFromJpegFile = filename => fs.readFileSync(filename).toString('binary');
const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile(filename));


function transformaDados(urlFoto){
    return console.log(getExifFromJpegFile(urlFoto));
};

