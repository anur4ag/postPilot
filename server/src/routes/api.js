const express = require("express");
const router = express.Router();
const db = require("../firebase");
const admin = require("firebase-admin");
// const client = require("../db");
const { addUID } = require("../middleware/authMiddleware");
const { handleUserSignup } = require("../controllers/authController");
const { run } = require("../controllers/postGenerator");
const { twitterPost } = require("../controllers/twitterController");
const { linkedinPost } = require("../controllers/linkedinController");
const { sendMail } = require("../controllers/Nodemailer");
const dbRef = admin.firestore().doc("twitter/token");
const superbase = require("../superbase");

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
  const uid = req.query.uid;
  req.session.uid = uid;
  res.redirect(getAuthorizationUrl());
});
router.get("/linkedin/callback", async (req, res) => {
  const uid = req.session.uid;
  const { code } = req.query;
  const accessToken = await getAccessToken(code);
  await saveCredentialsToFirebase(accessToken, uid);
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
  const uid = req.query.uid;
  req.session.uid = uid;
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackURL,
    {
      scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    }
  );
  req.session.codeVerifier = codeVerifier;
  await superbase
    .from("twitter")
    .insert({ uid: uid, state: state, codeverifier: codeVerifier });
  res.redirect(url);
});

// Callback for Twitter authorization
router.get("/auth/twitter/callback", async (req, res) => {
  const { state, code } = req.query;
  const uid = req.session.uid;
  const codeVerifier = req.session.codeVerifier;

  // const dbSnapshot = await dbRef.get();
  // const { codeVerifier, state: storedState } =
  const { data, error } = await superbase
    .from("twitter")
    .select("state")
    .eq("uid", uid);
  const storedState = data[0].state;
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

  const { err } = await superbase
    .from("twitter")
    .update({
      twitteraccesstoken: accessToken,
      twitterrefreshtoken: refreshToken,
    })
    .eq("uid", uid);
  await superbase.from("project").insert({
    uid: uid,
    job: "Twitter",
  });
  console.log(error);
  // eslint-disable-next-line max-len
  // const { data } = await loggedClient.v2.me(); // start using the client if you want
  res.redirect("http://localhost:5173/addprojectsection?method=twitter");
});

//post-generator

router.post("/postGenerator/twitter", async (req, res) => {
  const { type, email, uid } = req.body;
  console.log(type);
  try {
    // const response= await run(type);
    const post = await twitterPost(type, uid);
    console.log(post);
    const mail = sendMail(email);
    res.status(200);
  } catch (e) {
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
});
router.post("/postGenerator/linkedin", async (req, res) => {
  const { type, email, uid } = req.body;
  console.log(type);
  try {
    // const response= await run(type);
    const post = await linkedinPost(type, uid);
    console.log(post);
    const mail = sendMail(email);
    res.status(200);
  } catch (e) {
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
});

/*<------------- User Routes -------------> */
router.post("/user/signup", addUID, handleUserSignup);

module.exports = router;
