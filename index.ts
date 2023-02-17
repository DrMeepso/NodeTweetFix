// Twitter Setup
import { GetTweetById } from "./twitterAPI";
import { bearerToken } from "./token.json";

// Server Setup
import express from "express";
import cors from "cors";
let Port = 3000;
let Server = express();
Server.use(cors());


Server.get("/:user/status/:id", (req, res) => {

    let id = req.params.id;
    let user = req.params.user;

    GetTweetById(id, bearerToken).then((data) => {
        
        res.send(`
        
            <meta property="og:title" content="Tweet by ${user}" />
            <meta property="og:description" content="${data.data.text}" />
            <meta property="og:image" content="${data.includes.media[0].url}" />
            <meta property="og:url" content="https://twitter.com/${user}/status/${id}" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Twitter" />
            <meta property="og:locale" content="en_US" />

        `)


    })
})  

Server.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
})