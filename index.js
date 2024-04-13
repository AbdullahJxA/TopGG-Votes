var { Client , WebhookClient, MessageEmbed } = require("discord.js");
var client = new Client({ intents: 32767 })
var express = require("express")
var app = express()
var Topgg = require('@top-gg/sdk')
var webhook = new Topgg.Webhook(config.TOPGG_PASS)//the webhook u get from their website
var config = require(`./config.json`)
app.get('/', (req, res) => {
  res.send(`Good to go!`)
});
client.on(`ready`,()=> {
  console.log(`${client.user.id} is ready!`)
})
app.listen(process.env.PORT)

app.post('/dblwebhook', webhook.listener(vote => {
  console.log(vote.user)
  var embed = new MessageEmbed()
  .setTitle(`A new vote`)
  .setColor(`GREEN`)
  .setDescription(`Thank you (<@${vote.user}>) for voting for <@${client.user.id}>`)
  var webhookClient = new WebhookClient({ url : config.WEBHOOK_URL });
  webhookClient.send({content : `A new Vote from <@${vote.user}>`, username: 'TopGG Votes', embeds : [embed]})
}
))




client.login(config.token)