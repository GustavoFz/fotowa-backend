const multer = require('multer');
const routes = require('express').Router();
const multerConfig = require('./config/multer');
const fs = require("fs");
const path = require("path");
const piexif = require("piexifjs");

routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {

    return res.json({ saudacao: 'Conseguimos enviar o arquivo!'})
});

routes.get('/', (req, res) => {
       return res.json({ saudacao: 'Olá Pessoal!'})
});

routes.delete('/posts/:id', (req, res) => {
    fs.unlink(
        path.resolve(__dirname, "..", "temp", "uploads", req.params.id), (err => {
            if (err) console.log(err);
            else {
                return res.json({ acao: 'Arquivo excluido'})
            }
        })
    )
});



module.exports = routes;