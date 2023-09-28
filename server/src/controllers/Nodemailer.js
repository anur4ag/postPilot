
const nodemailer = require("nodemailer");


const transporter =  nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'sanjayduttyoyohoney@gmail.com',
      pass: 'vpmflylcyxomgejx'
    }
  });
  async function sendMail(to) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Post Successful yooo!" <sanjayduttyoyohoney@gmail.com>', // sender address
      to: to, // list of receivers
      subject: "Your automated post is successful", // Subject line
      text: "Hey check your post of Whatsapp", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    });
//   res.json(info);
    console.log("Message sent: %s", info.messageId);
    console.log(info);
  } 

  module.exports={sendMail}