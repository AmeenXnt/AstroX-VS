const config = require('../config')
const {Astro , commands} = require('../command')

Astro({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      var Ameen = "https://ameen-api.vercel.app/dance"
 await conn.sendMessage(m.key.remoteJid, { video: { url: Ameen }, mimetype: 'video/mp4', gifPlayback: true, ptv: true, caption: "◽By Ameen!" })
 return reply(`*Hey I Am  ${config.BOT_NAME}* \n\n*Owner:* ${config.OWNER_NAME} \n\n_Nothing Is Impossible. Motivate Your Own Self🙈_`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

Astro({
    pattern: "fuck",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{audio: {url:"https://files.catbox.moe/51htpa.mp3"}})
}catch(e){
console.log(e)
reply(`${e}`)
}
})

