const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static(__dirname));

app.get("/musicas", (req, res) => {

    const files = fs.readdirSync(__dirname);

    const musicas = files
        .filter(file => file.endsWith(".mp3"))
        .map(file => {

            const nome = file.replace(".mp3","");

            let cover = "";

            if(fs.existsSync(nome + ".png")){
                cover = "/" + nome + ".png";
            }

            if(fs.existsSync(nome + ".jpg")){
                cover = "/" + nome + ".jpg";
            }

            return {
                title: nome,
                audio: "/" + file,
                cover: cover
            };
        });

    res.json(musicas);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor online");
});
