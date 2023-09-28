const admin = require("firebase-admin");

const db=require("../firebase");
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
  
  async function twitterPost(text){
    const { refreshToken } = (await dbRef.get()).data();
 try{
    const {
        client: refreshedClient,
        accessToken,
        refreshToken: newRefreshToken,
      } = await twitterClient.refreshOAuth2Token(refreshToken);
      
      await dbRef.set({ accessToken, refreshToken: newRefreshToken });
      
      const { data } = await refreshedClient.v2.tweet(text);
      return data;
    }catch(e){
        console.log(e);
    }

  }
  module.exports={twitterPost}
