/******    *      ******  ******  ******
 *        * *     *    *  *       *
 ****    *****    ******  ****    ****** 
 *      *     *   *   *   *            *
 *     *       *  *    *  ******  ******    
 ©️Licensied by Faresse - Discord BOT Ranked XP */

/*********************
 *      Imports      *
 *********************/

const Discord = require('discord.js');
const bot = new Discord.Client();
const Google = require('./commands/google');

/* Imports - Rank XP */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

/* Database - Rank XP*/
const adapters = new FileSync('database.json');
const db = low(adapters);

db.defaults({ histoires : [], xp: []}).write()

let prefix = ('ç');

/* Rank XP - Messages*/
bot.on('message', message => {
  let msgauthor = message.author.id;
  if(message.author.bot)return;

  if(!db.get("xp").find({user : msgauthor}).value()){
    db.get("xp").push({user : msgauthor, xp: 1}).write();
}else{
    var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
    var userxp = Object.values(userxpdb)
    
    db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    if(message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`Stat des XP de : ${message.author.username}`)
            .setColor('#F4D03F')
            .addField("XP", `${xpfinal[1]} xp`)
            .setFooter("Enjoy :p")
        message.channel.send({embed : xp_embed})
        message.delete()
    }
  }
})

/*********************
 *    Profil du bot  *
 *********************/
bot.on('ready', function (){
  bot.user.setGame('The Division 2').catch(console.error)
  bot.user.setAvatar('./avatar/ubisoft.png').catch(console.error)
})

/*********************
 * Message d'accueil *
 *********************/

bot.on('guildMemberAdd', function () {
  member.createDM().then(function (channel){
      return channel.send('Bienvenue sur le channel ' + member.displayName)
  }).catch(console.error)
})

/*********************
 *  Recherche Google *    
 *********************/
bot.on('message', function (message) {
    Google.parse(message)
})

/*********************
 *    Token du BOT   *    
 *********************/

bot.login('ZRQjUeze.e4ODQ0ere4452YwMDAwDzrcMQ.kLmxPdysBFGERYez1ttrKdDkuU'); // Ceci est un faux :)

  