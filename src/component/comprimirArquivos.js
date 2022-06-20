const amdz = require('adm-zip');
const fs = require('fs');
const path = require('path');

function comprimeArquivos() {
    var toZip = fs.readdirSync(path.resolve(__dirname, "..", "..", "temp", "uploads"))

    var zip = new amdz();

    for( var k=0; k<toZip.length; k++){
    zip.addLocalFile(path.resolve(__dirname, "..", "..", "temp", "uploads", toZip[k]))
    }

    const data = zip.toBuffer();
    const length = zip.toBuffer().length; 
    
}

module.exports = {
    file_after_download: 'downloaded_file.zip',
    data: this.data,
    tamanho: this.length,
    comprimeArquivos
}