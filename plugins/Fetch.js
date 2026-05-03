 const config = require('../config')
    const {Astro, commands} = require('../command'); 
Astro({
    pattern: "fetch",
    desc: "fetch data from url",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
 
 let Ameen = args.join(" ").trimEnd()
    try {
    let response = await fetch(Ameen)
    let contentType = response.headers.get('content-type')
    if (contentType.startsWith('image/')) {
    await conn.sendMessage(m.key.remoteJid, { image: { url: Ameen }, caption: "◽ Take Your Image!" })
    } else if (contentType.startsWith('video/')) {
    if (command.includes('ptv')) {
    await conn.sendMessage(m.key.remoteJid, { video: { url: Ameen }, mimetype: 'video/mp4', gifPlayback: true, ptv: true, caption: "◽By Ameen!" })
    } else {
    await conn.sendMessage(m.key.remoteJid, { video: { url: Ameen }, caption: "◽Take Your Video!" })}
    } else if (contentType.startsWith('audio/')) {
    await conn.sendMessage(m.key.remoteJid, { audio: { url: Ameen }, mimetype: 'audio/mp4' })
        } else {
        await conn.sendMessage(m.key.remoteJid, { document: { url: Ameen }, mimetype: contentType, filename: "document" + `.${contentType.split('/')[1]}` })
        }
        } catch (error) {
        reply("Error: " + error.message)
        }
    });

    Astro({
    pattern: "ptv",
    desc: "fetch ptv from url",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    let Ameen = m.quoted ? m.quoted.text : args.join(" ").trimEnd()
    try {
    let response = await fetch(Ameen)
    let contentType = response.headers.get('content-type')
    if (contentType.startsWith('video/')) {
    await conn.sendMessage(m.key.remoteJid, { video: { url: Ameen }, mimetype: 'video/mp4', gifPlayback: true, ptv: true, caption: "◽By Ameen!" })
    } else {
    reply("Error: URL does not point to a video file.")
    }
        } catch (error) {
        reply("Error: " + error.message)
        }
    });