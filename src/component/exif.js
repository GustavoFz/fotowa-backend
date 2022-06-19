const piexif = require("piexifjs");
const fs = require("fs");

function transformaDados(foto){
    var nomeOriginal = foto
    var ano = nomeOriginal.slice(4, 8)
    var mes = nomeOriginal.slice(8, 10)
    var dia = nomeOriginal.slice(10, 12)

    var mascaraExif = ano + ":" + mes + ":" + dia + " " + "00:00:00"

    var fotoIn = `./temp/uploads/${nomeOriginal}`;
    var fotoOut = `./temp/uploads/modificada-${nomeOriginal}`;

    var jpeg = fs.readFileSync(fotoIn);
    var data = jpeg.toString("binary");

    var exif = {};
    exif[piexif.TagValues.ExifIFD.DateTimeOriginal] = mascaraExif

    var exifObj = {"Exif":exif};
    var exifbytes = piexif.dump(exifObj);

    var newData = piexif.insert(exifbytes, data);
    var newJpeg = Buffer.from(newData, "binary");
    fs.writeFileSync(fotoOut, newJpeg);

    console.log(mascaraExif)
    
};

module.exports = transformaDados;