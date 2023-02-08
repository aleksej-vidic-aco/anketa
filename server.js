require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Anketa = require("./Anketa");
const PORT = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
mongoose.connect(proccess.env.MONGO_DB_URI, {useNewUrlParser: true}).then(() => {
    app.listen(PORT || 5000, () => {
        console.log("Server radi");
    })
});
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
}))

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/getLikesAndDislikes", async (req, res) => {
    try {
        const anketa = await Anketa.findById("63e399862324777590d3eb8c");
        if(anketa == null) {
            return res.json({
                success: false,
                msg: "Nema"
            })
        }
        res.json({
            success: true,
            likes: anketa.likes,
            dislikes: anketa.dislikes
        })
    } catch (error) {
        console.log(error);
    }
})

app.put("/like", async (req, res) => {
    try {
        console.log(req.body);
        const {like, dislike} = req.body;
        const anketa = await Anketa.findById("63e399862324777590d3eb8c");
        if(anketa == null) {
            return res.json({
                success: false,
                msg: "Nema"
            })
        }
        if(like === "false" && dislike === "false") {
            anketa.likes = anketa.likes - 1;
        }
        if(like === "true" && dislike === "true") {
            anketa.dislikes = anketa.dislikes - 1;
            anketa.likes = anketa.likes + 1;
        }
        if(like === "true" && dislike === "false") {
            anketa.likes = anketa.likes + 1;
        }
        const saved = await anketa.save();
        res.json({
            likes: saved.likes,
            dislikes: saved.dislikes
        })
    } catch (error) {
        console.log(error)
    }
});

app.put("/dislike", async (req, res) => {
    try {
        const {like, dislike} = req.body;
        const anketa = await Anketa.findById("63e399862324777590d3eb8c");
        if(anketa == null) {
            return res.json({
                success: false,
                msg: "Nema"
            })
        }
        if(like === "false" && dislike === "false") {
            anketa.dislikes = anketa.dislikes - 1;
        }
        if(like === "true" && dislike === "true") {
            anketa.likes = anketa.likes - 1;
            anketa.dislikes = anketa.dislikes + 1;
        }
        if(like === "false" && dislike === "true") {
            anketa.dislikes = anketa.dislikes + 1;
        }
        const saved = await anketa.save();
        res.json({
            likes: saved.likes,
            dislikes: saved.dislikes
        })
    } catch (error) {
        console.log(err)
    }
})

