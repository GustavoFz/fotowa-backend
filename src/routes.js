const multer = require('multer');
const routes = require('express').Router();
const multerConfig = require('./config/multer');
const exif = require("./component/exif");
const deletaFoto = require('./component/deletaFoto');
const zip = require('./component/comprimirArquivos');


routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
    
    exif(req.file.originalname)
    return res.json({ saudacao: 'Conseguimos enviar o arquivo, capturar o nome e adiciona-lo no exif do arquivo!'})
});

routes.get('/', (req, res) => {
        zip.comprimeArquivos();

        res.set('Content-Type','application/octet-stream');
        res.set('Content-Disposition',`attachment; filename=${zip.file_after_download}`);
        res.set('Content-Length',this.length);
        res.send(zip.data);
});

routes.delete('/posts/:id', (req, res) => {

    deletaFoto(req.params.id)
    
    return res.json({ acao: 'Arquivo excluido'})
});



module.exports = routes;