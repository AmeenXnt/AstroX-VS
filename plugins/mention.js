const config = require('../config')
const {Astro , commands} = require('../command')
const os = require("os")
const { runtime, sleep } = require('../lib/functions')
const axios = require('axios')

Astro({
    on: "body",
    desc: "menu help message and menu edit to edit settings",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins,
     isBotAdmins,
     isAdmins,
     verify,
     reply}) => {
 
        var RandomAudio = [ 
             "https://cdn.kord.live/serve/K5NVWY5quwFC.mp4",
             "https://cdn.kord.live/serve/L4ri9ZthXLXA.mp4",
             "https://ameen-api.vercel.app/dance"
             ]

        let MentionType = 1;
        let prefix = config.PREFIX || '!';
        var MTEXT = config.MENTION_TEXT || "You have been mentioned!";
        var MAUDIO = config.MENTION_AUDIO || RandomAudio[Math.floor(Math.random() * RandomAudio.length)];
        var MVIDEO = config.MENTION_VIDEO || RandomAudio[Math.floor(Math.random() * RandomAudio.length)];
        var MIMG = config.MENTION_IMG || "https://v7-tool.vercel.app/PNG/menu.png";
        var MNAME = config.MENTION_NAME || "AstroX V2⚡";

        if (body.startsWith("! mtype") || body.startsWith("!mtype")) {
            try {
        const args = body.trim().split(' ');
        const type = args[1];

        if (!type || (type !== '1' && type !== '2' && type !== '3')) {
            var mentionTypes = "1. Mention with Audio\n2. Mention with Round Video\n3. Mention with Text Only";
            var example = `
*Example Audio:* 
_${prefix}maudio img-url;name;audio-url_
*Example Video:*
_${prefix}mvideo video-url_
*Example Text:*
_${prefix}mtext mention-text_
`
            return reply(`Please specify mention type as 1 or 2 or 3.\n${mentionTypes}\n\nExample: !mtype 1\n\n${example}`);
        }

        MentionType = parseInt(type);
        reply(`Mention type set to ${MentionType}\n\n${example}`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    } }

else if (body.startsWith("!maudio") || body.startsWith("! maudio")) {
           
    let [mentionIMG, mentionNAME, mentionAUDIO] = args.join(' ').split(';');
   
    if (mentionIMG) {
        config.MENTION_IMG = mentionIMG.trim();
      }
    if (mentionNAME) {
        config.MENTION_NAME = mentionNAME.trim();
    }
    if (mentionAUDIO) {
        config.MENTION_AUDIO = mentionAUDIO.trim();
    }
    
    reply("✅ Mention settings updated successfully!");
    }
else if (body.startsWith("!mvideo") || body.startsWith("! mvideo")) {
    let [mentionVIDEO] = args.join(' ').split(';');

    if (mentionVIDEO) {
        config.MENTION_VIDEO = mentionVIDEO.trim();
    }
    
    reply("✅ Mention settings updated successfully!");
    }
else if (body.startsWith("!mtext") || body.startsWith("! mtext")) {
    let [mentionTeXT] = args.join(' ').split(';');
    if (mentionTeXT) {
        config.MENTION_TEXT = mentionTeXT.trim();
    }
    reply("✅ Mention settings updated successfully!");
    }
else if (body.startsWith("@916238768108") || body.startsWith("!mtest")) {
        var mentionMessage;
        if (MentionType === 1) {
            await conn.sendMessage(from, 
    { audio: { url: MAUDIO },
    ptt: false,
     mimetype: "audio/mpeg",
     contextInfo: {
        externalAdReply: {
            title: MNAME,
            body: "↻   ◁   ||   ▷   ↺",
            thumbnailUrl: MIMG,
            sourceUrl: "https://www.instagram.com/iem_ameen",
            redirectUrl: "https://www.instagram.com/iem_ameen",
            renderLargerThumbnail: true,
            mediaType: 1
        }}
     },
      { quoted: verify })
        } else if (MentionType === 2) {
            mentionMessage = {
                video: { url: MVIDEO },
                mimetype: 'video/mp4',
                fileName: "Astro.mp4",
                gifPlayback: true,
                ptv: true
                };
            conn.sendMessage(m.key.remoteJid, mentionMessage, { quoted: verify });
        } else if (MentionType === 3) {
            mentionMessage = {
                text: MTEXT
                };
            conn.sendMessage(m.key.remoteJid, mentionMessage, { quoted: verify });
        } else {
            reply("Unknown mention type.");
        }
    }
}
)