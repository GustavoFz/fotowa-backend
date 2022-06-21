const multer = require('multer');
const routes = require('express').Router();
const multerConfig = require('./config/multer');
const exif = require("./component/exif");
const deletaFoto = require('./component/deletaFoto');
const admz = require('adm-zip');
const path = require('path');
const fs = require('fs');


routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
    
    exif(req.file.originalname);
  
    return res.json({ saudacao: 'Conseguimos enviar o arquivo, capturar o nome e adiciona-lo no exif do arquivo!'})
});

routes.get('/', (req, res) => {
    return res.json({ saudacao: 'Rota /'})
});

routes.delete('/posts/:id', (req, res) => {

    deletaFoto(req.params.id)
    
    return res.json({ acao: 'Arquivo excluido'})
});

routes.get('/download', (req, res) => {

    var toZip = fs.readdirSync(path.resolve(__dirname, "..", "temp", "fotos_modificadas"))

    var zip = new admz();

    for( var k=0; k<toZip.length; k++){
    zip.addLocalFile(path.resolve(__dirname, "..", "temp", "fotos_modificadas", toZip[k]))
    }

    const data = zip.toBuffer();
    const file_after_download = 'file.zip'

    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${file_after_download}`);
    res.set('Content-Length',data.length);
    res.send(data);
});



module.exports = routes;