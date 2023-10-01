# Post Pilot

**Post Pilot** is a AI powered Ghostwriting platform that combines three main tools: Web Scrapping,  AI Powered content generation and Auto posting bot. It allows users to chose from a wide variety of news type content and generate latest and engaging piece of content that will be automatically posted on the platform of their choice at the interval/frequency set up by the user .

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [License](#license)

## Introduction

**Digitomize** is designed to provide developers with a comprehensive platform for exploring coding contests and creating dynamic portfolios that showcase their coding skills and achievements.

## Features

- **Web Scrapping** The PuppeteerJS bot extracts information from the news website you've chosen based on your "news type" preference. It then provides your audience with a list of the most recent news articles, along with their corresponding links.

- **AI Powered Post generator:** In our application, we've seamlessly integrated GPT 3.5 turbo to generate captivating and thought-provoking posts for you. The GPT plugin intuitively identifies your chosen news category and collaborates with the PuppeteerJS scraper to deliver the freshest and most engaging content to you.

## Getting Started

### Prerequisites

- Node.js and npm
- Superbase
- React
- Tailwind

### Installation

1. Clone the repository: `git clone https://github.com/anur4ag/postPilot`
2. Install project dependencies and start the development environment: <br>
   a. In the `server` directory of the project , run `npm install`. <br>
   b. In the `client` directory of the project , run `npm install`. <br>
   
3. Configure environment variables: Create a .env file in the server and client directories respectively, and set up the required environment variables such as database connection details, API keys, and other configurations.
4. Start the development environment: 
	a. From the root directory `cd server` and `node src/index.js`
	b.  From the root directory `cd client` and `npm run dev`

## Usage

### Twitter/Linkedin Auto Posting AI Bot

- Visit the **Dashboard** page to automate your twitter/linkedin account by authorizing the app and selecting the news type that you want to post in your account.
- Select form a wide variety of category for your content based on your preferences.
- Click on `start automation` button to spin up a magical post for you that will be posted to your account.

### PuppeteerJS for web scraping
- The puppeteerJS bot scrapes the news website that you have selected in your `news type` preference and returns a list of latest news articles with their respective link for your audience. 
- This list is then shared with ChatGPT to produce high quality, thought proving
- and engaging piece of content that you can share on your socials. 

### OpenAI's ChatGPT Integration

- We have integrated GPT 3.5 turbo in our app to make thought provoking, exciting and engaging post for you .
- The GPT plugin automatically detects the news type selected by you and takes in input from the puppeteerJS scrapper to give you that latest and hot piece of engaging content.

## License

This project is licensed under the [MIT License](LICENSE).
