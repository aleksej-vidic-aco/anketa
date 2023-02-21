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
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
    app.listen(PORT || 5000, () => {
        console.log("Server radi");
    })
});
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
}))
app.post("/create", async (req, res) => {
    try {
        const {title} = req.body;
        const newPost = await Anketa.create({title: title});
        if(newPost) {
            res.json({
                data: newPost
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: "Greska"
        })
    }
})
app.get("/getAllPosts", async (req, res) => {
    try {
       const allPosts = await Anketa.find({});
       res.json({
        data: allPosts
       }) 
    } catch (error) {
        console.log(error);
        res.json({
            msg: "Greska"
        })
    }
})
app.get("/", (req, res) => {
    res.render("index");
})
app.put("/likePost/:id", async (req, res) => {
    try {
        const {like, dislike} = req.body;
        const id = req.params.id;
        const anketa = await Anketa.findById(id);
        if(anketa == null) {
            return res.json({
                success: false,
                msg: "Nema posta"
            })
        }
        if(like === "false" && dislike === "false" && anketa.like > 0) {
            anketa.like = anketa.like - 1;
        }
        if(like === "true" && dislike === "true" && anketa.dislike > 0) {
            anketa.dislike = anketa.dislike - 1;
            anketa.like = anketa.like + 1;
        }
        if(like === "true" && dislike === "false") {
            anketa.like = anketa.like + 1;
            
        }
        const saved = await anketa.save();
        res.json({
            likes: saved.like,
            dislikes: saved.dislike
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: "Greska",
        })
    }
})
app.put("/dislikePost/:id", async (req, res) => {
    try {
        const {like, dislike} = req.body;
        const id = req.params.id;
        const anketa = await Anketa.findById(id);
        if(anketa == null) {
            return res.json({
                success: false,
                msg: "Nema posta",
            })
        }
        if(like === "false" && dislike === "false" && anketa.dislike > 0) {
            anketa.dislike = anketa.dislike - 1;
        }
        if(like === "true" && dislike === "true" && anketa.like > 0) {
            anketa.like = anketa.like - 1;
            anketa.dislike = anketa.dislike + 1;
        }
        if(like === "false" && dislike === "true") {
            anketa.dislike = anketa.dislike + 1;
            
        }
        const saved = await anketa.save();
        res.json({
            likes: saved.like,
            dislikes: saved.dislike
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            msg: "Greska"
        })
    }
});
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

