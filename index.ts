// Twitter Setup
import { GetTweetById } from "./twitterAPI";
import { bearerToken } from "./token.json";
import { VideoEmbed, PhotoEmbed, TextEmbed, findEmbedType } from "./embedGenerator";

// Server Setup
import express from "express";
import cors from "cors";
let Port = 3000;
let Server = express();
Server.use(cors());


Server.get("/:user/status/:id", (req, res) => {

    let id = req.params.id;
    let user = req.params.user;

    // Check if id is a valid tweet id and its made of numbers 
    if (id.length !== 19 || isNaN(Number(id))) {
        res.send(`<meta property="og:description" content="I cant find a video with a id of ${id}! 😿"/>`);
        return
    }


    GetTweetById(id, bearerToken).then((data) => {
        
        switch (findEmbedType(data)) {

            case "text":

                let Text = new TextEmbed(user, id, data);
                res.send(Text.GenerateEmbed());

            break

            case "video":

                let Video = new VideoEmbed(user, id, data);
                res.send(Video.GenerateEmbed());

            break

            case "photo":

                let Photo = new PhotoEmbed(user, id, data);
                res.send(Photo.GenerateEmbed());

            break
        
        }



    })
})  

Server.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
})