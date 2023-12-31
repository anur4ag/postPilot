const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const { twitterPost } = require("../controllers/twitterController");
const { linkedinPost } = require("../controllers/linkedinController");
const { sendMail } = require("../controllers/Nodemailer");
const superbase = require("../superbase");

const frontendUrl = process.env.FRONTEND_URL;
const backendUrl = process.env.BACKEND_URL;

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});
const callbackURL = `${backendUrl}/auth/twitter/callback`;

const {
  getAuthorizationUrl,
  getAccessToken,
  saveCredentialsToFirebase,
} = require("../controllers/linkedinController");

const axios = require("axios");

/*<------------- Linkedin Router -------------> */
router.post("/postGenerator/linkedin", async (req, res) => {
  const { type, email, uid } = req.body;
  console.log(type);
  const socialMedia = "Linkedin";
  try {
    // const response= await run(type);
    const post = await linkedinPost(type, uid, socialMedia);
    console.log(post);
    const mail = sendMail(email, socialMedia);
    res.status(200);
  } catch (e) {
    console.log(e);
  }
});

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
  res.redirect(`${frontendUrl}/addprojectsection?method=linkedin`);
});

/*<------------- Twitter Router -------------> */

router.post("/postGenerator/twitter", async (req, res) => {
  const { type, email, uid } = req.body;
  console.log(type);
  const socialMedia = "Twitter";
  try {
    // const response= await run(type);
    const post = await twitterPost(type, uid, socialMedia);
    console.log(post);
    const mail = sendMail(email, socialMedia);
    res.status(200);
  } catch (e) {
    console.log(e);
  }
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
  // eslint-disable-next-line max-len
  // const { data } = await loggedClient.v2.me(); // start using the client if you want
  res.redirect(`${frontendUrl}/addprojectsection?method=twitter`);
});

module.exports = router;
