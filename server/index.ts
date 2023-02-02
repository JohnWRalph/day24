import express from "express";
import fs from "fs"
import cors from 'cors'
import validateUserInput from "../validateUserInput";

let errorMessage;
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.get("/videogame", function (req, res) {
    const videogames = fs.readFileSync("./videogames.json");
    res.send(videogames);
})

app.post("/videogame", function (req, res) {
    const videogames = JSON.parse(fs.readFileSync("./videogames.json") as any as string);
    const filteredWords = JSON.parse(fs.readFileSync("./filteredWords.json") as any as string);
    const name = req.body.name;
    const platform = req.body.platform;
    const releaseYear = req.body.releaseYear;
    const genre = req.body.genre;
    const esrb = req.body.esrb;
    const isGood = req.body.isGood

    try {
        validateUserInput(name, platform, releaseYear, genre, esrb, isGood, videogames, filteredWords)
    } catch (e) {
        errorMessage = e.message
        console.log("message:",errorMessage)
        res.send({
            error: e.message
        })
        return;
    }

    const videogame: Videogame = {
        name: name,
        platform: platform,
        releaseYear: releaseYear,
        genre: genre,
        esrb: esrb,
        isGood: isGood,
        image: req.body.image
    }

  
    videogames.push(videogame)
    fs.writeFileSync("./videogames.json", JSON.stringify(videogames));
    res.send(videogame)
})

app.listen(3002)