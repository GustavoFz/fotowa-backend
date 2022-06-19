const fs = require("fs");
const path = require("path");

function deletaFoto(id){
    fs.unlink(
        path.resolve(__dirname, "..", "..", "temp", "uploads", id), (err => {
            if (err) console.log(err);
            else {
                console.log("Arquivo excluido")
            }
        })
    )
}

module.exports = deletaFoto;