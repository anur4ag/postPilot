const puppeteer = require("puppeteer");
const dotenv = require("dotenv").config();
const fs = require("fs");

// const { postGenerator}=require("../Outerbase Testing/gpt");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
let news = [];
async function run(link, type) {
  const url = `https://economictimes.indiatimes.com/tech/${link}`;
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const newsHandles = await page.$$(".article-list> .story-box.clearfix");

  for (const newshandle of newsHandles) {
    const titleElement = await newshandle.$("div.desc > h4 > a");

    const title = await page.evaluate(
      (el) => el.querySelector("div.desc > h4 > a").textContent,
      newshandle
    );
    const link = await page.evaluate(
      (el) => el.getAttribute("href"),
      titleElement
    );
    const about = await page.evaluate(
      (gl) => gl.querySelector(" div.desc > p").textContent,
      newshandle
    );

    news.push({
      title: title,
      desc: about,
      link: `economictimes.indiatimes.com${link}`,
    });
  }

  browser.close();

  if (news.length >= 5) {
    return await postGenerator(news.splice(5), type);
  } else {
    return await postGenerator(news, type);
  }
}
async function postGenerator(newsArray, type) {
  console.log(typeof newsArray);
  //console.log("array printing", newsArray);
  let prompt2;
  if (type == "Linkedin") {
    prompt2 = `You are a news reporter who is an expert in his field, using the following news, create a LinkedIn post that is engaging and informative.Use snarky and casual undertone but make it a detailed and thought-provoking post. Constraints : do not include pretext or context in your response, only return the linkedin post. Only use words  Maximum upto 2000 charecters(enforce this charecter limit very seriously), also insert main website's news link at last. The news is:\n\n`;

    newsArray.forEach((news) => {
      prompt2 += `Title: ${news.title}\n`;
      prompt2 += `Link: ${news.link}\n`;
      prompt2 += `Description: ${news.desc}\n\n`;
    });
  } else {
    prompt2 = `You are a news reporter who is an expert in his field, using the following news, create a Twitter post that is engaging and informative.Use snarky and casual undertone but make it a detailed and thought-provoking post. Constraints : do not include pretext or context in your response, only return the twitter post.Limit to the word maximum word limit of a single tweet i.e 250 charecters (enforce it very seriously). Only provide  any one of the news from all news and set the economic times link for users to read the rest of news. The news is:\n\n`;
    newsArray.forEach((news) => {
      prompt2 += `Title: ${news.title}\n`;
      prompt2 += `Link: ${news.link}\n`;
      prompt2 += `Description: ${news.desc}\n\n`;
    });
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt2,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices[0].message.content;
  //console.log(response);
  return response;
}

module.exports = { run };
