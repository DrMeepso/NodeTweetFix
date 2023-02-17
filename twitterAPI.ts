import superagent from "superagent"

export function GetTweetById(id: string, Bearertoken: string): Promise<any> {

    return new Promise((resolve, reject) => {

        superagent
            .get(`https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&media.fields=url,variants&tweet.fields=attachments,text`)
            .set('Authorization', `Bearer ${Bearertoken}`)
            .then(res => {
                resolve(res.body)
            })

    })
}