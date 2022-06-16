const multer = require('multer');
const path = require('path');
// const multerS3 = require('multer-s3')
// const aws = require('aws-sdk')
// const crypto = require('crypto');

const storageType = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
        /* ADICIONA UM HASH RANDOMICO ANTES DO NOME DO ARQUIVO (EVITAR SOBREPOSIÇÃO DE ARQUIVOS COM MESMO NOME) */
        /*
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString("hex")}-${file.originalname}`

                cb(null, file.key);
            });
        }
        */
    })
};

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'), //__dirname refencia o diretorio config(atual), o restante faz voltar duas pastas e entrar no temp e depois no upload
    storage: storageType[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 20 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpg",
            "image/jpeg",
            "image/png"
        ];
        
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    }
};