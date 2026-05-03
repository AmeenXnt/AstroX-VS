/*const config = require('../config')
    const { commands, Astro } = require('../command'); 

Astro({
    pattern: "ping",
    desc: "Check Bot's Performance.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const AmeenT = '📍ping...';
        m.react(config.wait);
        const start = new Date().getTime(); 
        const AmeenS = await conn.sendMessage(from, { text: AmeenT }, { quoted: mek });
        const end = new Date().getTime();
        const TripTime = end - start;
        const AmeenET = '*🍁ꜱᴩᴇᴇᴅ!* ' + TripTime + ' *ms*';
        await conn.sendMessage(from, { text: AmeenET, edit: AmeenS.key });
        m.react(config.done);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});





Astro({
    pattern: "ping",
    desc: "Check Bot's Performance.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const AmeenT = '_*AstroX-V2* is running on_ *NodeJS* _with_ *Baileys* _Library._';
        m.react(config.wait);
        const start = new Date().getTime(); 
        const AmeenS = await conn.sendMessage(from, { text: AmeenT }, { quoted: mek });
        const end = new Date().getTime();
        const TripTime = end - start;
        const AmeenET = `*𝕾𝖕𝖊𝖊𝖉 𝖇𝖔𝖙 🕊️:* ${TripTime} *ᴍꜱ*`;
        await conn.sendMessage(from, { text: AmeenET, edit: AmeenS.key });
        m.react(config.done);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
*/
const config = require('../config')
const { commands, Astro } = require('../command'); 

// Variable to store ping message type (default to 1)
let pingType = 1;

// Command to set ping type
Astro({
    pattern: "setping",
    desc: "Set custom ping message type.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, body, reply }) => {
    try {
        const args = body.trim().split(' ');
        const type = args[1];

        if (!type || (type !== '1' && type !== '2')) {
            return reply('Please specify ping type as 1 or 2. Example: !setping 1');
        }

        pingType = parseInt(type);
        reply(`Ping type set to ${pingType}`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Ping command
Astro({
    pattern: "ping",
    desc: "Check Bot's Performance.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let messageText;
        if (pingType === 1) {
            messageText = '📍ping...';
        } else if (pingType === 2) {
            messageText = '_*AstroX-V2* is running on_ *NodeJS* _with_ *Baileys* _Library._';
        } else {
            messageText = 'Unknown ping type.';
        }

        m.react(config.wait);
         let fuk = {
    'key': {
      'fromMe': false,
      'participant': "0@s.whatsapp.net",
      'remoteJid': 'status@broadcast'
    },
    'message': {
      'contactMessage': {
        'displayName': "AstroX-V2",
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'AMEENINT'\nitem1.TEL;waid=" + m.sender.split('@')[0x0] + ':' + m.sender.split('@')[0x0] + "\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
      }
    }
  };
        const start = new Date().getTime();
        const sentMsg = await conn.sendMessage(from, { text: messageText }, { quoted: fuk });
        const end = new Date().getTime();
        const tripTime = end - start;
        const responseText = pingType === 1
            ? `*🍁ꜱᴩᴇᴇᴅ!* ${tripTime} *ms*`
            : `*𝕾𝖕𝖊𝖊𝖉 𝖇𝖔𝖙 🕊️:* ${tripTime} *ᴍꜱ*`;

        await conn.sendMessage(from, { text: responseText, edit: sentMsg.key },{ quoted: fuk });
        m.react(config.done);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});