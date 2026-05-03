const config = require('../config')
const {Astro , commands} = require('../command')

Astro({
    pattern: "support",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{



let andix = (`THANK YOU FOR CHOOSING CRONAZ-XD, HERE ARE OUR SUPPORTIVE GROUP.\n\n ☉ WHATSAPP GROUP ☉\n\n❒⁠⁠⁠⁠ https://chat.whatsapp.com/CfFibovjGmu8tbJtKfs57Z`);
 

return await m.reply(andix);


}catch(e){
console.log(e)
reply(`${e}`)
}
})
