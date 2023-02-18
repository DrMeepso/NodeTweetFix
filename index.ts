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

// Routes
Server.get("/:user/status/:id/", HandelRequest)
Server.get("/:user/status/:id/:mediaID", HandelRequest)

// Request Handler
function HandelRequest(req: any, res: any){

    let id = req.params.id;
    let user = req.params.user;
    let mediaID = parseInt(req.params.mediaID) - 1 || 0;

    if (id.length !== 19 || isNaN(Number(id))) {
        res.send(`<meta property="og:description" content="I cant find a video with a id of ${id}! 😿"/> <meta property="theme-color" content="#e872e2"/>`);
        return
    }


    GetTweetById(id, bearerToken).then((data) => {
        
        switch (findEmbedType(data, mediaID)) {

            case "text":

                let Text = new TextEmbed(user, id, data, mediaID);
                res.send(Text.GenerateEmbed());

            break

            case "video":

                let Video = new VideoEmbed(user, id, data, mediaID);
                res.send(Video.GenerateEmbed());

            break

            case "photo":

                let Photo = new PhotoEmbed(user, id, data, mediaID);
                res.send(Photo.GenerateEmbed());

            break
        
            case "errorNullMedia":

                res.send(`<meta property="og:description" content="There is only ${data.includes.media.length} image(s)/video(s) on this tweet not ${mediaID+1}! 😿"/> <meta property="theme-color" content="#e872e2"/>`);

            break

        }



    })
}

Server.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
})