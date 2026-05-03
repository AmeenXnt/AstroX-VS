const {Astro , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')
const config = require('../config')
const fetch = require('node-fetch')


Astro({
    pattern: "play",
    desc: "download songs",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, verify, reply}) => {
try{
if (!q && !quoted) return reply("Please provide a search query");

// Handle quoted message properly
var txt = q ? q : (quoted?.conversation || quoted?.text);
if (!txt) return reply("Please provide a search query");
if (isGroup) {
     await conn.groupSettingUpdate(m.chat , 'announcement');
}
var waitMsg = await conn.sendMessage(from, { text: "_Searching..._" }, { quoted: mek });
var ApiS = "https://ameen-api.vercel.app/v2/yts?q="
var ApiD = "https://ameen-api.vercel.app/v2/ytd?url="

// Fetch search results
var pari = await fetch(`${ApiS}${encodeURIComponent(txt)}`)
var andi = await pari.json()
var waitMsg1 = await conn.sendMessage(from, { text: "_Collecting results..._", edit: waitMsg.key }, { quoted: mek });

if (!andi?.status || !andi?.result?.length) {
    await conn.sendMessage(from, { text: "_No results found_", edit: waitMsg1.key }, { quoted: mek });
    return reply("_No results found_");
}

var fuck = await andi.result[0]
console.log(fuck)
var waitMsg2 = await conn.sendMessage(from, { text: "_Processing request..._", edit: waitMsg1.key }, { quoted: mek });
var img = await fuck.thumb
var title = await fuck.title
var url1 = await fuck.url

var desc = `

 *🎶𝗔𝗨𝗗𝗜𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎶*
*__________________________*
 *Title* : _${title}_
 *Url* : _${url1}_
*__________________________*

> *©ᴘᴏᴡᴇʀᴅ ʙʏ team keiko*

`

await conn.sendMessage(from, { image: { url: img }, caption: desc }, { quoted: verify })
var waitMsg3 = await conn.sendMessage(from, { text: "_Details by team keiko_", edit: waitMsg2.key }, { quoted: mek });

// Fetch download URL
var down = await fetch(`${ApiD}${encodeURIComponent(url1)}`).then(res => res.json())

// Check if download API returned valid response
if (!down?.status || !down?.result?.url) {
    await conn.sendMessage(from, { text: "_Failed to get download URL_", edit: waitMsg3.key }, { quoted: mek });
    return reply("_Failed to get audio download URL. Please try another song._");
}

var waitMsg4 = await conn.sendMessage(from, { text: "_Downloading..._", edit: waitMsg3.key }, { quoted: mek });
var waitMsg5 = await conn.sendMessage(from, { text: "_Downloading.._", edit: waitMsg4.key }, { quoted: mek });
var waitMsg6 = await conn.sendMessage(from, { text: "_Downloading._", edit: waitMsg5.key }, { quoted: mek });
var waitMsg7 = await conn.sendMessage(from, { text: "_Downloading.._", edit: waitMsg6.key }, { quoted: mek });
var waitMsg8 = await conn.sendMessage(from, { text: "_Downloading..._", edit: waitMsg7.key }, { quoted: mek });

var downloadUrl = await down.result.url
var thu = await down.result.thumb
// Validate the URL before sending
if (!downloadUrl || downloadUrl === 'undefined' || !downloadUrl.startsWith('http')) {
    await conn.sendMessage(from, { text: "_Invalid download URL received_", edit: waitMsg8.key }, { quoted: mek });
    return reply("_Failed to get valid audio URL. Please try another song._");
}

var insta = "https://www.instagram.com/iem_ameen"
var waitMsg9 = await conn.sendMessage(from, { text: "_Download completed_", edit: waitMsg8.key }, { quoted: mek });

// Send the audio
await conn.sendMessage(from, 
    { audio: { url: downloadUrl },
    ptt: false,
     mimetype: "audio/mpeg",
     contextInfo: {
        externalAdReply: {
            title: title,
            body: "↻   ◁   ||   ▷   ↺",
            thumbnailUrl: 'https://ameen-api.vercel.app/music2',
            sourceUrl: insta,
            redirectUrl: insta,
            renderLargerThumbnail: true,
            mediaType: 1
        }}
     },
      { quoted: verify })
if (isGroup) {
        await conn.groupSettingUpdate(m.chat , 'not_announcement');
    }
var waitMsg10 = await conn.sendMessage(from, { text: "_Ready To Play_", footer: "© powered by team keiko", edit: waitMsg9.key }, { quoted: mek });

} catch(e) {
console.log(e)
reply(`Error: ${e.message}`)
}
})

Astro({
    pattern: "iplay",
    desc: "download songs",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, verify, reply}) => {
try{
if (!q && !quoted) return reply("Please provide a search query");

// Handle quoted message properly
var txt = q ? q : (quoted?.conversation || quoted?.text);
if (!txt) return reply("Please provide a search query");
if (isGroup) {
     await conn.groupSettingUpdate(m.chat , 'announcement');
}
var waitMsg = await conn.sendMessage(from, { text: "_Searching..._" }, { quoted: mek });
var ApiS = "https://ameen-api.vercel.app/v2/yts?q="
var ApiD = "https://ameen-api.vercel.app/v2/ytd?url="

// Fetch search results
var pari = await fetch(`${ApiS}${encodeURIComponent(txt)}`)
var andi = await pari.json()
var waitMsg1 = await conn.sendMessage(from, { text: "_Collecting results..._", edit: waitMsg.key }, { quoted: mek });

if (!andi?.status || !andi?.result?.length) {
    await conn.sendMessage(from, { text: "_No results found_", edit: waitMsg1.key }, { quoted: mek });
    return reply("_No results found_");
}

var fuck = await andi.result[0]
console.log(fuck)
var waitMsg2 = await conn.sendMessage(from, { text: "_Processing request..._", edit: waitMsg1.key }, { quoted: mek });
var img = await fuck.thumb
var title = await fuck.title
var url1 = await fuck.url

var desc = `

 *🎶𝗔𝗨𝗗𝗜𝗢-𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎶*
*__________________________*
 *Title* : _${title}_
 *Url* : _${url1}_
*__________________________*

> *©ᴘᴏᴡᴇʀᴅ ʙʏ team keiko*

`

await conn.sendMessage(from, { image: { url: img }, caption: desc }, { quoted: mek })
var waitMsg3 = await conn.sendMessage(from, { text: "_Details by team keiko_", edit: waitMsg2.key }, { quoted: mek });

// Fetch download URL
var down = await fetch(`${ApiD}${encodeURIComponent(url1)}`).then(res => res.json())

// Check if download API returned valid response
if (!down?.status || !down?.result?.url) {
    await conn.sendMessage(from, { text: "_Failed to get download URL_", edit: waitMsg3.key }, { quoted: mek });
    return reply("_Failed to get audio download URL. Please try another song._");
}

var waitMsg4 = await conn.sendMessage(from, { text: "_Downloading..._", edit: waitMsg3.key }, { quoted: mek });
var waitMsg5 = await conn.sendMessage(from, { text: "_Downloading.._", edit: waitMsg4.key }, { quoted: mek });
var waitMsg6 = await conn.sendMessage(from, { text: "_Downloading._", edit: waitMsg5.key }, { quoted: mek });
var waitMsg7 = await conn.sendMessage(from, { text: "_Downloading.._", edit: waitMsg6.key }, { quoted: mek });
var waitMsg8 = await conn.sendMessage(from, { text: "_Downloading..._", edit: waitMsg7.key }, { quoted: mek });

var downloadUrl = await down.result.url
var thu = await down.result.thumb
// Validate the URL before sending
if (!downloadUrl || downloadUrl === 'undefined' || !downloadUrl.startsWith('http')) {
    await conn.sendMessage(from, { text: "_Invalid download URL received_", edit: waitMsg8.key }, { quoted: mek });
    return reply("_Failed to get valid audio URL. Please try another song._");
}

var insta = "https://www.instagram.com/iem_ameen"
var waitMsg9 = await conn.sendMessage(from, { text: "_Download completed_", edit: waitMsg8.key }, { quoted: mek });

await conn.sendMessage(from, { audio: { url: downloadUrl }, ptt: false }, { quoted: mek });
if (isGroup) {
        await conn.groupSettingUpdate(m.chat , 'not_announcement');
    }
var waitMsg10 = await conn.sendMessage(from, { text: "_Ready To Play_", footer: "© powered by team keiko", edit: waitMsg9.key }, { quoted: mek });

} catch(e) {
console.log(e)
reply(`Error: ${e.message}`)
}
})