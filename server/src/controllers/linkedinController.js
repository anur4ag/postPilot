const axios = require("axios");
const db = require("../firebase");
const { link } = require("../routes/api");
const dotenv = require("dotenv").config();

const superbase = require("../superbase");
const { run } = require("./postGenerator");

const getAuthorizationUrl = () => {
  const redirectUri = encodeURI(`${process.env.BACKEND_URL}/linkedin/callback`);

  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${redirectUri}&state=foobar&scope=profile%20email%20w_member_social%20openid`;
};

const getAccessToken = async (code) => {
  const redirectUri = encodeURI(`${process.env.BACKEND_URL}/linkedin/callback`);
  const response = await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    null,
    {
      params: {
        grant_type: "authorization_code",
        code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: redirectUri,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(response.data.access_token);
  return response.data.access_token;
};

const saveCredentialsToFirebase = async (accessToken, uid) => {
  try {
    const response = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Handle the response here
    console.log(response.data);
    const { sub, name, email, picture } = response.data;
    const { error } = await superbase
      .from("linkedin")
      .insert({ uid: uid, linkedinsub: sub, linkedinaccesstoken: accessToken });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
const linkedinPost = async (postContent, uid, socialMedia) => {
  try {
    const postData = await run(postContent, socialMedia);
    const { data } = await superbase
      .from("linkedin")
      .select("linkedinaccesstoken, linkedinsub")
      .eq("uid", uid);
    const accessToken = data[0].linkedinaccesstoken;
    const profileId = data[0].linkedinsub;
    try {
      const response = await axios.post(
        "https://api.linkedin.com/v2/ugcPosts",
        {
          author: `urn:li:person:${profileId}`,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: {
                text: postData,
              },
              shareMediaCategory: "NONE",
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
module.exports = {
  getAuthorizationUrl,
  getAccessToken,
  saveCredentialsToFirebase,
  linkedinPost,
};
