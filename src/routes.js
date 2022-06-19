const multer = require('multer');
const routes = require('express').Router();
const multerConfig = require('./config/multer');
const exif = require("./component/exif");
const deletaFoto = require('./component/deletaFoto');


routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
    
    exif(req.file.originalname)
    return res.json({ saudacao: 'Conseguimos enviar o arquivo, capturar o nome e adiciona-lo no exif do arquivo!'})
});

routes.get('/', (req, res) => {

       return res.json("asddsds: asas")
});

routes.delete('/posts/:id', (req, res) => {

    deletaFoto(req.params.id)
    
    return res.json({ acao: 'Arquivo excluido'})
});



module.exports = routes;