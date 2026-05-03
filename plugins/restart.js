const config = require('../config')
const {Astro , commands} = require('../command')
const {sleep} = require('../lib/functions')

Astro({
    pattern: "restart",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const {exec} = require("child_process")
reply("_*restarting...📍*_")
await sleep(1500)
// when restarted whats newly added features will be sent to the what where the command is used and also to the owner

exec("npm restart", (error, stdout, stderr) => {
    
    var restartMsg = `*AstroX-V2* has been restarted successfully! 🚀`
        if (error) {
        console.error(error);
        reply(`${error}`);
    }
    if (stdout) {
        console.log(stdout);
    }
    if (stderr) {
        console.error(stderr);
    }
});
}catch(e){
console.log(e)
reply(`${e}`)
}
})
