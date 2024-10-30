module.exports = {
  description: "What is HAPi Ai",
  async run({ api, send, admin }){
    await send({
      attachment: {
        type: "image",
        payload: {
          url: "https://ibb.co/gzjjT8b",
          is_reusable: true
        }
      }
    });
    setTimeout(async () => await send({
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `About HAPi Ai:
HAPi Ai is your friendly, helpful personal assistant.

Contact us admins if you experienced/encountered any issue regarding to the bot and I will try to fix it. Thankyou for using me as a personal assistant!`,
          buttons: [
            {
              type: "web_url",
              url: "https://www.facebook.com/profile.php?id=61567254512779",
              title: "Like/Follow our Page"
                },
            {
              type: "web_url",
              url: "https://www.facebook.com/im.mentallyunstable.bro",
              title: "Contact Admin 1"
                },
            {
              type: "web_url",
              url: "https://www.facebook.com/p/マカパガル-ジャーヴィー-61565897880759/",
              title: "Contact Admin 2"
                }
             ]
        }
      }
    }), 2*1000);
  }
}
