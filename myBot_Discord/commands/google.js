const Command = require('./command')

module.exports = class Google extends Command {

    static match (message) {
        return message.content.startsWith('!google')
    }

    static action (message) {
        let bot = message.content.split(' ')
        bot.shift()
        message.delete()
        message.reply('https://www.google.com/#q=' + bot.join('%20'))
    }
}