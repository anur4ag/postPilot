const express = require("express");
const router = express.Router();
const db = require("../firebase");
const admin = require("firebase-admin");
// const client = require("../db");
const { addUID } = require("../middleware/authMiddleware");
const { handleUserSignup } = require("../controllers/authController");
const {run}=require("../controllers/postGenerator");
const {twitterPost}=require("../controllers/twitterController");
const {linkedinPost}=require('../controllers/linkedinController');
const {sendMail}=require("../controllers/Nodemailer");
const dbRef = admin.firestore().doc("twitter/token");

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
  clientId: "TWhWXzNIdXpLSVBHYV82bjhCTlU6MTpjaQ",
  clientSecret: "TY5DgWm4jLZfmnkA5P722lVyxNQUn-2ebr-09phrGIfligGdK1",
});
const callbackURL = "http://localhost:3000/auth/twitter/callback";

const {
  getAuthorizationUrl,
  getAccessToken,
  saveCredentialsToFirebase,
} = require("../controllers/linkedinController");

const axios = require("axios");

/*<------------- Linkedin Router -------------> */

router.get("/linkedin/authorize", (req, res) => {
  res.redirect(getAuthorizationUrl());
});
router.get("/linkedin/callback", async (req, res) => {
  const { code } = req.query;
  const accessToken = await getAccessToken(code);
  await saveCredentialsToFirebase(accessToken);
  res.redirect(`http://localhost:5173/addprojectsection?method=linkedin`);
});

/*<------------- Twitter Router -------------> */

router.post("/post-tweet", async (req, res) => {
  const { tweetText } = req.body;
  const { refreshToken } = (await dbRef.get()).data();

  const {
    client: refreshedClient,
    accessToken,
    refreshToken: newRefreshToken,
  } = await twitterClient.refreshOAuth2Token(refreshToken);

  await dbRef.set({ accessToken, refreshToken: newRefreshToken });

  const { data } = await refreshedClient.v2.tweet(tweetText);

  res.send(data);
});

// Authorize with Twitter
router.get("/auth/twitter", async (req, res) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackURL,
    { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
  );
  await dbRef.set({ codeVerifier, state });
  res.redirect(url);
});

// Callback for Twitter authorization
router.get("/auth/twitter/callback", async (req, res) => {
  const { state, code } = req.query;

  const dbSnapshot = await dbRef.get();
  console.log(dbSnapshot);
  const { codeVerifier, state: storedState } = dbSnapshot.data();

  if (state !== storedState) {
    return response.status(400).send("Stored tokens do not match!");
  }

  const {
    client: loggedClient,
    accessToken,
    refreshToken,
  } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: callbackURL,
  });

  await dbRef.set({ accessToken, refreshToken });

  // eslint-disable-next-line max-len
  const { data } = await loggedClient.v2.me(); // start using the client if you want
  res.redirect('http://localhost:5173/addprojectsection?method=twitter');

});


//post-generator

router.post("/postGenerator/twitter", async(req, res)=>{
  const{type, email}=req.body;
  console.log(type);
 try{
  // const response= await run(type);
  const post=await twitterPost(type);
  console.log(post);
  const mail=sendMail(email);
  res.status(200);
 }catch(e){
  console.log(e);
 }
//  res.redirect("http://localhost:5173/projectsection");
  // console.log("from api.js", response);
  // try{
  //   const response=await linkedinPost("hii from postPilot");
  //   console.log(response);
  // }catch(e){
  //   console.log(e);
  // }


})

/*<------------- User Routes -------------> */
router.post("/user/signup", addUID, handleUserSignup);

module.exports = router;
