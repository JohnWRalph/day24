import express from "express";
import fs from "fs"
import cors from 'cors'

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors()); 


app.get("/videogame", function (req, res) {
    const videogames = fs.readFileSync("./videogames.json");
    res.send(videogames);
})

app.post("/videogame", function(req, res) {

    const name = req.body.name;
    const platform = req.body.platform;
    const releaseYear = req.body.releaseYear;
    const genre = req.body.genre;
    const esrb = req.body.esrb;
    const isGood = req.body.isGood
    const videogame: Videogame = {
        name: name,
        platform: platform,
        releaseYear:releaseYear,
        genre: genre,
        esrb: esrb,
        isGood: isGood,
        imageURL: req.body.imageURL
    }

    const videogames = JSON.parse(fs.readFileSync("./videogames.json")as any as string);  
    videogames.push(videogame)
    fs.writeFileSync("./videogames.json",JSON.stringify(videogames));

    res.send(videogame)
})

app.listen( 3002)