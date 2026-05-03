const {Astro , commands} = require('../command')

Astro({
    pattern: "infobot",
    desc: "info the bot",
    category: "main",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👋 Hello ${pushname}*

> *MY BOT INFO 👨‍💻* 

🌸 ʙᴏᴛ ɴᴀᴍᴇ -: *ᴄʀᴏɴᴀᴢ-xᴅ*
🌸 *ɴᴜᴍʙᴇʀ* -:  *918078438059*
🌸 *ᴏᴡɴᴇʀ ɴᴀᴍᴇ -:* *ᴄʀᴏɴᴇx-xᴅ*
🌸 *ɪɴꜱᴛᴀ*-:  https://www.instagram.com/kl_white_ser/profilecard/?igsh=MTE3cHhvZHQ2bGJqeg==
🌸 *ᴡʜᴀᴛꜱᴀᴩᴩ ɢʀᴜᴏᴩ*-:*https://chat.whatsapp.com/CfFibovjGmu8tbJtKfs57Z
🌸 *ʀᴇᴩᴏ* -:*.....*

*©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʀᴏɴᴀᴢ-xᴅ*
`
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/7m8fsh.png`},caption:dec},{quoted:mek});

// Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://cdn.ironman.my.id/i/mjueor.mp4' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

}catch(e){
console.log(e)
reply(`${e}`)
}
})
