const admin = require("firebase-admin");
const superbase = require("../superbase");
const dotenv = require("dotenv").config();
const db = require("../firebase");
const { run } = require("./postGenerator");
const dbRef = admin.firestore().doc("twitter/token");

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

async function twitterPost(type, uid, socialMedia) {
  const tweetText = await run(type, socialMedia);
  const { data, error } = await superbase
    .from("twitter")
    .select("twitterrefreshtoken")
    .eq("uid", uid);
  const refreshToken = data[0].twitterrefreshtoken;
  console.log(data, "from superbase in function twitterPost");
  console.log(refreshToken, "from twitter controller twitterPost");
  try {
    const {
      client: refreshedClient,
      accessToken,
      refreshToken: newRefreshToken,
    } = await twitterClient.refreshOAuth2Token(refreshToken);

    await superbase
      .from("twitter")
      .update({
        twitteraccesstoken: accessToken,
        twitterrefreshtoken: newRefreshToken,
      })
      .eq("uid", uid);

    const { data } = await refreshedClient.v2.tweet(type);
    return data;
  } catch (e) {
    console.log(e, "catch condfrom twitter controller twitterPost");
  }
}
module.exports = { twitterPost };
