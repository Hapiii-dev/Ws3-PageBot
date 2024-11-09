const token = "EAARmR46QSiYBO4ki0eMuIppzTm0iMxuRgWyZBRa7J3f6TdwfMiNOTh6kzawOR5XGdRpZAdHpgDznUZArlzlVNBnT3lxAhAWuZBCjZC1SMbPzFXaP3dv5pSi6WQKcTexeYn0mSKEVolN4FV16YULpPuvlrg3qEbqAT4aLD7X2n6OQm6dj3cXsYgVxnxyVEvz61dAZDZD";
const PAGE_ACCESS_TOKEN = process.env.token || token;
const request = require('request');
const axios = require("axios");
const cmdLoc = __dirname + "/commands";
const temp = __dirname + "/temp";
const fs = require("fs");
const prefix = "/";
const commands = [];
const descriptions = [];
module.exports = {
  PAGE_ACCESS_TOKEN,
  async loadCommands() {
    const commandsPayload = [];
    fs.readdir(cmdLoc, {}, async (err, files) => {
      for await (const name of files) {
        const readCommand = require(cmdLoc + "/" + name);
        const commandName = readCommand.name || (name.replace(".js", "")).toLowerCase();
        const description = readCommand.description || "No description provided.";
        commands.push(commandName);
        descriptions.push(description);
        commandsPayload.push({
          name: `${prefix + commandName}`,
          description
        });
        console.log(commandName, "Loaded");
      }
      console.log("Wait...");
    });
    const dataCmd = await axios.get(`https://graph.facebook.com/v21.0/me/messenger_profile`, {
      params: {
        fields: "commands",
        access_token: PAGE_ACCESS_TOKEN
      }
    });
    if (dataCmd.data.data.commands){
    if (dataCmd.data.data[0].commands[0].commands.length === commandsPayload.length)
    return console.log("Commands not changed");
    }
    const loadCmd = await axios.post(`https://graph.facebook.com/v21.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`, {
      commands: [
        {
          locale: "default",
          commands: commandsPayload
      }
    ]
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (loadCmd.data.result === "success")
      console.log("Commands loaded!")
    else
      console.log("Failed to load commands");
    return;
  },
  commands,
  descriptions,
  cmdLoc,
  temp,
  prefix,
  admin: [
"100061663298126",
"61565897880759"
],
  async sendMessage(senderId, message, pageAccessToken) {
    return await new Promise(async (resolve, reject) => {
      const sendMsg = await axios.post(`https://graph.facebook.com/v21.0/me/messages`,
      {
        recipient: { id: senderId },
        message
      }, {
        params: {
          access_token: pageAccessToken
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = sendMsg.data;
      if (data.error) {
        console.error('Error sending message:', data.error);
        reject(data.error);
      }
      resolve(data);
    });
  },
  async publishPost(message, access_token) {
    return await new Promise(async (resolve, reject) => {
    const res = await axios.post(`https://graph.facebook.com/v21.0/me/feed`,
    {
      message,
      access_token
    }, {
      params: {
        access_token
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res) reject();
    resolve(res.data);
    });
  },
  introduction: `Hello, I am HAPi Ai and I am your assistant.
Type ${prefix}help for available commands.

Note: HAPi is highly recommended to use Messenger because some features won't work and limited.
🤖 Created by Jervie Macapagal`,
  api_josh: "https://joshweb.click",
  echavie: "https://echavie3.nethprojects.workers.dev"
}
