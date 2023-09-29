const admin = require("firebase-admin");
const superbase = require("../superbase");

const db = require("../firebase");
const dbRef = admin.firestore().doc("twitter/token");

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
  clientId: "TWhWXzNIdXpLSVBHYV82bjhCTlU6MTpjaQ",
  clientSecret: "TY5DgWm4jLZfmnkA5P722lVyxNQUn-2ebr-09phrGIfligGdK1",
});

// router.post("/post-tweet", async (req, res) => {
//     const { tweetText } = req.body;
//     const { refreshToken } = (await dbRef.get()).data();

//     const {
//       client: refreshedClient,
//       accessToken,
//       refreshToken: newRefreshToken,
//     } = await twitterClient.refreshOAuth2Token(refreshToken);

//     await dbRef.set({ accessToken, refreshToken: newRefreshToken });

//     const { data } = await refreshedClient.v2.tweet(tweetText);

//     res.send(data);
//   });

async function twitterPost(text, uid) {
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

    const { data } = await refreshedClient.v2.tweet(text);
    return data;
  } catch (e) {
    console.log(e, "catch condfrom twitter controller twitterPost");
  }
}
module.exports = { twitterPost };
