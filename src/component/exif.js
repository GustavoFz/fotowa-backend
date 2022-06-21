const piexif = require("piexifjs");
const fs = require("fs");
const deletaFoto = require("./deletaFoto");

function transformaDados(foto){
    var nomeOriginal = foto
    var ano = nomeOriginal.slice(4, 8)
    var mes = nomeOriginal.slice(8, 10)
    var dia = nomeOriginal.slice(10, 12)

    var mascaraExif = ano + ":" + mes + ":" + dia + " " + "12:00:00"

    var fotoIn = `./temp/uploads/${nomeOriginal}`;
    var fotoOut = `./temp/fotos_modificadas/${nomeOriginal}`;

    var jpeg = fs.readFileSync(fotoIn);
    var data = jpeg.toString("binary");

    var exif = {};
    exif[piexif.TagValues.ExifIFD.DateTimeOriginal] = mascaraExif

    var exifObj = {"Exif":exif};
    var exifbytes = piexif.dump(exifObj);

    var newData = piexif.insert(exifbytes, data);
    var newJpeg = Buffer.from(newData, "binary");
    fs.writeFileSync(fotoOut, newJpeg);

    deletaFoto(nomeOriginal)
    
};

module.exports = transformaDados;