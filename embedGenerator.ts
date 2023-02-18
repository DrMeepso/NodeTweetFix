export function findEmbedType(data: any, mediaIndex:number) {

    mediaIndex = mediaIndex

    if (!data.includes.media) {
        return "text"
    } 
    
    if (mediaIndex > data.includes.media.length-1) {
        return "errorNullMedia"
    }
    if (data.includes.media[mediaIndex].type === "photo") {
        return "photo"
    } else if (data.includes.media[mediaIndex].type === "video" || data.includes.media[mediaIndex].type === "animated_gif") {
        return "video"
    }

}

class EmbedGenerator {

    public User: string;
    public Id: string;
    public Data: any;
    public mediaIndex: number;

    public MetaTags: string[];

    constructor(user: string, id: string, data: any, mediaIndex:number = 0) {
        this.User = user;
        this.Id = id;
        this.Data = data;
        this.mediaIndex = mediaIndex;

        this.MetaTags = [
            `<meta http-equiv="refresh" content="0; url=https://twitter.com/${this.Data.includes.users[0].username}/status/${this.Id}"/>`,
            `<style>body {background-color: black;}</style>`,

            `<meta property="theme-color" content="#e872e2"/>`,
            `<meta property="twitter:site" content="@${this.Data.includes.users[0].username}"/>`,
            `<meta property="twitter:creator" content="@${this.Data.includes.users[0].username}"/>`,
            `<meta property="twitter:title" content="${this.Data.includes.users[0].name} (@${this.Data.includes.users[0].username})"/>`,
            `<meta property="og:title" content="${this.Data.includes.users[0].name} (@${this.Data.includes.users[0].username})"/>`,

        ];

    }

    public CleanTweetText(text: string) {

        let cleanText = text.replace(/https:\/\/t.co\/[a-zA-Z0-9]*/g, "");
        return cleanText

    }

    public GenerateEmbed() {

    }

}

export class VideoEmbed extends EmbedGenerator {

    constructor(user: string, id: string, data: any, mediaIndex:number) {
        super(user, id, data, mediaIndex);
    }

    public GenerateEmbed() {

        let video = this.Data.includes.media[this.mediaIndex]

        let VideoURL: any = {}
        let lastBitrate = 0
        // Loop though all the variants and find the one with the highest bitrate that is a video format
        for (let i = 0; i < video.variants.length; i++) {
            if (video.variants[i].content_type === "video/mp4") {
                if (video.variants[i].bit_rate > lastBitrate) {
                    VideoURL = video.variants[i]
                    lastBitrate = video.variants[i].bit_rate
                }
            }
        }

        this.MetaTags.push(
            `<meta property="twitter:title" content="DEEZ NUTS"/>`,
            `<meta property="og:site_name" content="${this.CleanTweetText(this.Data.data.text)}">`,
            `<meta property="twitter:card" content="player"/>`,
            `<meta property="twitter:player:stream:content_type" content="${VideoURL.content_type}"/>`,
            `<meta property="twitter:player:height" content="${video.height}"/>`,
            `<meta property="twitter:player:width" content="${video.width}"/>`,
            `<meta property="og:video" content="${VideoURL.url}"/>`,
            `<meta property="og:video:secure_url" content="${VideoURL.url}"/>`,
            `<meta property="og:video:height" content="${video.height}"/>`,
            `<meta property="og:video:width" content="${video.width}"/>`,
            `<meta property="og:video:type" content="${VideoURL.content_type}"/>`,
            `<meta property="twitter:image" content="0"/>`
        );

        let html = `
        <!DOCTYPE html>
        <html>
        
            <head>
                <title>${this.Data.includes.users[0].name} (@${this.Data.includes.users[0].username})</title>
                ${this.MetaTags.join("")}
            </head>
        
            <body>
            </body>
        
        </html>`

        return html

    }

}

export class PhotoEmbed extends EmbedGenerator {

    constructor(user: string, id: string, data: any, mediaIndex:number) {
        super(user, id, data, mediaIndex);
    }

    public GenerateEmbed() {

        let photo = this.Data.includes.media[this.mediaIndex]

        this.MetaTags.push(
            `<meta property="twitter:title" content="DEEZ NUTS"/>`,
            `<meta property="og:site_name" content="${this.CleanTweetText(this.Data.data.text)}">`,
            `<meta name="twitter:card" content="summary_large_image" />`,
            `<meta property="twitter:image" content="${photo.url}"/>`,
            `<meta property="twitter:image" content="${photo.url}"/>`,
            `<meta property="twitter:image:width" content="${photo.width}"/>`,
            `<meta property="twitter:image:height" content="${photo.height}"/>`,
        );

        let html = `
        <!DOCTYPE html>
        <html>
        
            <head>
                <title>${this.Data.includes.users[0].name} (@${this.Data.includes.users[0].username})</title>
                ${this.MetaTags.join("")}
            </head>
        
            <body>
            </body>
        
        </html>`

        return html
    }

}

export class TextEmbed extends EmbedGenerator {

    constructor(user: string, id: string, data: any, mediaIndex:number) {
        super(user, id, data, mediaIndex);
    }

    public GenerateEmbed() {

        this.MetaTags.push(
            `<meta name="twitter:card" content="summary" />`,
            `<meta property="twitter:image" content="0"/>`,
            `<meta property="twitter:title" content="DEEZ NUTS" />`,
            `<meta property="og:description" content="${this.CleanTweetText(this.Data.data.text)}" />`
        );

        let html = `
        <!DOCTYPE html>
        <html>
        
            <head>
                <title>${this.Data.includes.users[0].name} (@${this.Data.includes.users[0].username})</title>
                ${this.MetaTags.join("")}
            </head>
        
            <body>
            </body>
        
        </html>`

        return html
    }

}