const {Astro , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

Astro({
    pattern: "songs",
    react: "🎵",
    desc: "downlod song",
    category: "downlod",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("*❌Please give me url or titel*")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
 *🎶𝐂𝐑𝐎𝐍𝐀𝐙-𝐗𝐃   𝗔𝗨𝗗𝗜𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎶*
|__________________________
| ℹ️ *title* : *${deta.title}*
| 📋 *description* : *${deta.description}*
| 🕘 *time* : *${deta.timestamp}*
| 📌 *ago* : *${deta.ago}*
| 📉 *views* : *${deta.views}*
|__________________________

*©ᴘᴏᴡᴇʀᴅ ʙʏ ᴄʀᴏɴᴀᴢ-xᴅ*

`

await conn.sendMessage(from,{image :{ url: deta.thumbnail},caption:desc},{quoted:mek});

//downlod audio+ document

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message 
await conn.sendMessage(from,{audio:{url:downloadUrl},mimetype:"audio/mpeg",caption :"*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴄᴅ-ᴍᴅ*"},{quoted:mek})
await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"audio/mpeg",fileName:deta.title + ".mp3" ,caption :"*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀᴏɴᴀᴢ-xᴅ*"},{quoted:mek})

  

}catch(e){
console.log(e)
reply(`${e}`)
}
})
