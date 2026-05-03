const { 
    proto, 
    downloadContentFromMessage, 
    getContentType,
    generateWAMessageFromContent, // <-- NEW IMPORT
    prepareWAMessageMedia         // <-- NEW IMPORT
} = require('@eypzx/baileys')
	const fs = require('fs')
const { getBuffer } = require('./functions')
const {
	imageToWebP,
	videoToWebP
} = require('./sticker');

const downloadMediaMessage = async(m, filename) => {
	if (m.type === 'viewOnceMessage') {
		m.type = m.msg.type
	}
	if (m.type === 'imageMessage') {
		var nameJpg = filename ? filename + '.jpg' : 'undefined.jpg'
		const stream = await downloadContentFromMessage(m.msg, 'image')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameJpg, buffer)
		return fs.readFileSync(nameJpg)
	} else if (m.type === 'videoMessage') {
		var nameMp4 = filename ? filename + '.mp4' : 'undefined.mp4'
		const stream = await downloadContentFromMessage(m.msg, 'video')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameMp4, buffer)
		return fs.readFileSync(nameMp4)
	} else if (m.type === 'audioMessage') {
		var nameMp3 = filename ? filename + '.mp3' : 'undefined.mp3'
		const stream = await downloadContentFromMessage(m.msg, 'audio')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameMp3, buffer)
		return fs.readFileSync(nameMp3)
	} else if (m.type === 'stickerMessage') {
		var nameWebp = filename ? filename + '.webp' : 'undefined.webp'
		const stream = await downloadContentFromMessage(m.msg, 'sticker')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameWebp, buffer)
		return fs.readFileSync(nameWebp)
	} else if (m.type === 'documentMessage') {
		var ext = m.msg.fileName.split('.')[1].toLowerCase().replace('jpeg', 'jpg').replace('png', 'jpg').replace('m4a', 'mp3')
		var nameDoc = filename ? filename + '.' + ext : 'undefined.' + ext
		const stream = await downloadContentFromMessage(m.msg, 'document')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameDoc, buffer)
		return fs.readFileSync(nameDoc)
	}
}

const sms = (conn, m) => {
	if (m.key) {
		m.id = m.key.id
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = m.fromMe ? conn.user.id.split(':')[0]+'@s.whatsapp.net' : m.isGroup ? m.key.participant : m.key.remoteJid
	}
	if (m.message) {
		m.type = getContentType(m.message)
		m.msg = (m.type === 'viewOnceMessage') ? m.message[m.type].message[getContentType(m.message[m.type].message)] : m.message[m.type]
		if (m.msg) {
			if (m.type === 'viewOnceMessage') {
				m.msg.type = getContentType(m.message[m.type].message)
			}
			var quotedMention = m.msg.contextInfo != null ? m.msg.contextInfo.participant : ''
			var tagMention = m.msg.contextInfo != null ? m.msg.contextInfo.mentionedJid : []
			var mention = typeof(tagMention) == 'string' ? [tagMention] : tagMention
			mention != undefined ? mention.push(quotedMention) : []
			m.mentionUser = mention != undefined ? mention.filter(x => x) : []
			m.body = (m.type === 'conversation') ? m.msg : (m.type === 'extendedTextMessage') ? m.msg.text : (m.type == 'imageMessage') && m.msg.caption ? m.msg.caption : (m.type == 'videoMessage') && m.msg.caption ? m.msg.caption : (m.type == 'templateButtonReplyMessage') && m.msg.selectedId ? m.msg.selectedId : (m.type == 'buttonsResponseMessage') && m.msg.selectedButtonId ? m.msg.selectedButtonId : ''
			m.quoted = m.msg.contextInfo != undefined ? m.msg.contextInfo.quotedMessage : null
			if (m.quoted) {
				m.quoted.type = getContentType(m.quoted)
				m.quoted.id = m.msg.contextInfo.stanzaId
				m.quoted.sender = m.msg.contextInfo.participant
				m.quoted.fromMe = m.quoted.sender.split('@')[0].includes(conn.user.id.split(':')[0])
				m.quoted.msg = (m.quoted.type === 'viewOnceMessage') ? m.quoted[m.quoted.type].message[getContentType(m.quoted[m.quoted.type].message)] : m.quoted[m.quoted.type]
				if (m.quoted.type === 'viewOnceMessage') {
					m.quoted.msg.type = getContentType(m.quoted[m.quoted.type].message)
				}
				var quoted_quotedMention = m.quoted.msg.contextInfo != null ? m.quoted.msg.contextInfo.participant : ''
				var quoted_tagMention = m.quoted.msg.contextInfo != null ? m.quoted.msg.contextInfo.mentionedJid : []
				var quoted_mention = typeof(quoted_tagMention) == 'string' ? [quoted_tagMention] : quoted_tagMention
				quoted_mention != undefined ? quoted_mention.push(quoted_quotedMention) : []
				m.quoted.mentionUser = quoted_mention != undefined ? quoted_mention.filter(x => x) : []
				m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
					key: {
						remoteJid: m.chat,
						fromMe: m.quoted.fromMe,
						id: m.quoted.id,
						participant: m.quoted.sender
					},
					message: m.quoted
				})
				m.quoted.download = (filename) => downloadMediaMessage(m.quoted, filename)
				m.quoted.delete = () => conn.sendMessage(m.chat, { delete: m.quoted.fakeObj.key })
				m.quoted.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.quoted.fakeObj.key } })
			}
			
		}
		m.download = (filename) => downloadMediaMessage(m, filename)
	}
	
 
	m.reply = (teks, id = m.chat, option = { mentions: [m.sender] }) => conn.sendMessage(id, { text: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
	m.ameen = (teks, id = m.chat, option = { mentions: [m.sender] }) => {
	 var meera = teks.split(';')
		conn.sendMessage(id, { text: meera[0], contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
	m.react(meera[1])
	}
    m.image = (teks, id = m.chat, option = { mentions: [m.sender] }) => {
        var mimmi = teks.split(';')
        var ninja = mimmi[1] || '*Image By Cronex-Xd🥳*'
        var url = getBuffer(mimmi[0])
        conn.sendMessage(id, { image: url, caption: ninja}, { quoted: m })
        }
	m.replyS = (stik, id = m.chat, option = { mentions: [m.sender] }) => conn.sendMessage(id, { sticker: stik, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
	m.replyImg = (img, teks, id = m.chat, option = { mentions: [m.sender] }) => conn.sendMessage(id, { image: img, caption: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
	m.replyVid = (vid, teks, id = m.chat, option = { mentions: [m.sender], gif: false }) => conn.sendMessage(id, { video: vid, caption: teks, gifPlayback: option.gif, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
	m.replyAud = (aud, id = m.chat, option = { mentions: [m.sender], ptt: false }) => conn.sendMessage(id, { audio: aud, ptt: option.ptt, mimetype: 'audio/mpeg', contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
	m.replyDoc = (doc, id = m.chat, option = { mentions: [m.sender], filename: 'undefined.pdf', mimetype: 'application/pdf' }) => conn.sendMessage(id, { document: doc, mimetype: option.mimetype, fileName: option.filename, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
	m.replyContact = (name, info, number) => {
		var vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + name + '\n' + 'ORG:' + info + ';\n' + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' + 'END:VCARD'
		conn.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: m })
	}
	m.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } })
	m.sendSticker = async (jid, buffer, options) => {
let type = m.quoted;
if(type.imageMessage) {
let stickerBuffer = await imageToWebP(buffer, {
packname: options.packname,
author: options.author
});
return await conn.sendMessage(jid, { sticker : stickerBuffer } , { quoted : m });
} else if(type.videoMessage) {
let stickerBuffer = await videoToWebP(buffer, {
packname: options.packname,
author: options.author
});
return await conn.sendMessage(jid, { sticker : stickerBuffer } , { quoted : m });
}
			      }
	m.replyButton = async (text, buttons, footer = '', quoted = m) => {
                // buttons should be an array of arrays: [['Button 1 Text', 'button-id-1'], ['Button 2 Text', 'button-id-2']]
                let buttonMessage = {
                    text: text,
                    footer: footer,
                    buttons: buttons.map((btn, index) => ({
                        buttonId: btn[1] || `button-id-${index}`,
                        buttonText: { displayText: btn[0] },
                        type: 1 // Quick Reply Button Type
                    })),
                    headerType: 1 // TEXT Header Type
                }
                await conn.sendMessage(m.chat, buttonMessage, { quoted: quoted })
            }

            // Function to send an image message with quick-reply buttons
            m.replyImgButton = async (buffer, text, buttons, footer = '', quoted = m) => {
                // buffer is the image data (Buffer)
                // buttons format is the same as m.replyButton

                // 1. Prepare the media (image) for upload
                let media = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
                
                // 2. Build the final message content using generateWAMessageFromContent
                let message = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    buttonsMessage: {
                        caption: text,
                        imageMessage: media.imageMessage,
                        footerText: footer,
                        buttons: buttons.map((btn, index) => ({
                            buttonId: btn[1] || `button-id-${index}`,
                            buttonText: { displayText: btn[0] },
                            type: 1
                        })),
                        headerType: 4 // IMAGE Header Type
                    }
                }), { quoted: quoted })
                
                // 3. Send the message
                return conn.relayMessage(m.chat, message.message, { messageId: message.key.id })
			}
	
	return m
} 

module.exports = { sms,downloadMediaMessage }

/*
const { 
    proto, 
    downloadContentFromMessage, 
    getContentType,
    generateWAMessageFromContent, // <-- NEW IMPORT
    prepareWAMessageMedia         // <-- NEW IMPORT
} = require('@eypzx/baileys')
const fs = require('fs')
const { getBuffer } = require('./functions')
const {
	imageToWebP,
	videoToWebP
}
= require('./sticker');

const downloadMediaMessage = async(m, filename) => {
	if (m.type === 'viewOnceMessage') {
		m.type = m.msg.type
	}
	if (m.type === 'imageMessage') {
		var nameJpg = filename ? filename + '.jpg' : 'undefined.jpg'
		const stream = await downloadContentFromMessage(m.msg, 'image')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameJpg, buffer)
		return fs.readFileSync(nameJpg)
	} else if (m.type === 'videoMessage') {
		var nameMp4 = filename ? filename + '.mp4' : 'undefined.mp4'
		const stream = await downloadContentFromMessage(m.msg, 'video')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameMp4, buffer)
		return fs.readFileSync(nameMp4)
	} else if (m.type === 'audioMessage') {
		var nameMp3 = filename ? filename + '.mp3' : 'undefined.mp3'
		const stream = await downloadContentFromMessage(m.msg, 'audio')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameMp3, buffer)
		return fs.readFileSync(nameMp3)
	} else if (m.type === 'stickerMessage') {
		var nameWebp = filename ? filename + '.webp' : 'undefined.webp'
		const stream = await downloadContentFromMessage(m.msg, 'sticker')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameWebp, buffer)
		return fs.readFileSync(nameWebp)
	} else if (m.type === 'documentMessage') {
		var ext = m.msg.fileName.split('.')[1].toLowerCase().replace('jpeg', 'jpg').replace('png', 'jpg').replace('m4a', 'mp3')
		var nameDoc = filename ? filename + '.' + ext : 'undefined.' + ext
		const stream = await downloadContentFromMessage(m.msg, 'document')
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(nameDoc, buffer)
		return fs.readFileSync(nameDoc)
	}
}

const sms = (conn, m) => {
	if (m.key) {
		m.id = m.key.id
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = m.fromMe ? conn.user.id.split(':')[0]+'@s.whatsapp.net' : m.isGroup ? m.key.participant : m.key.remoteJid
	}
	if (m.message) {
		m.type = getContentType(m.message)
		m.msg = (m.type === 'viewOnceMessage') ? m.message[m.type].message[getContentType(m.message[m.type].message)] : m.message[m.type]
		if (m.msg) {
			if (m.type === 'viewOnceMessage') {
				m.msg.type = getContentType(m.message[m.type].message)
			}
			var quotedMention = m.msg.contextInfo != null ? m.msg.contextInfo.participant : ''
			var tagMention = m.msg.contextInfo != null ? m.msg.contextInfo.mentionedJid : []
			var mention = typeof(tagMention) == 'string' ? [tagMention] : tagMention
			mention != undefined ? mention.push(quotedMention) : []
			m.mentionUser = mention

			m.body = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || m.message.videoMessage?.caption || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.message.buttonsResponseMessage?.selectedButtonId || m.message.buttonsResponseMessage?.selectedButtonId || m.message.groupInviteMessage?.caption || m.message.templateButtonReplyMessage?.selectedId || m.message.stickerMessage?.fileSha256?.toString('base64') || m.message.imageMessage?.fileSha256?.toString('base64') || m.message.videoMessage?.fileSha256?.toString('base64') || m.message.audioMessage?.fileSha256?.toString('base64') || m.message.documentMessage?.fileSha256?.toString('base64') || m.message.contactMessage?.vcard || m.message.liveLocationMessage?.caption || m.message.editedMessage?.message?.editedMessage?.extendedTextMessage?.text || ''
			m.q = m.body.trim().split(/ +/).splice(1).join(" ")
			m.quoted = m.msg.contextInfo?.quotedMessage ? new sms(conn, {
				key: {
					remoteJid: m.chat,
					fromMe: m.msg.contextInfo.participant === conn.user.id.split(':')[0] + '@s.whatsapp.net',
					id: m.msg.contextInfo.stanzaId,
					participant: m.msg.contextInfo.participant
				},
				message: m.msg.contextInfo.quotedMessage
			}) : false
			m.reply = (text) => conn.sendMessage(m.chat, { text: text, contextInfo: { mentionedJid: m.mentionUser } }, { quoted: m })
			m.replyTxt = (text, id = m.chat, option = { mentions: [m.sender] }) => conn.sendMessage(id, { text: text, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
			m.replyImg = (img, id = m.chat, option = { mentions: [m.sender], caption: '' }) => conn.sendMessage(id, { image: img, caption: option.caption, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
			m.replyVid = (vid, id = m.chat, option = { mentions: [m.sender], caption: '' }) => conn.sendMessage(id, { video: vid, caption: option.caption, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
			m.replyAud = (aud, id = m.chat, option = { mentions: [m.sender], ptt: false }) => conn.sendMessage(id, { audio: aud, ptt: option.ptt, mimetype: 'audio/mpeg', contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
			m.replyDoc = (doc, id = m.chat, option = { mentions: [m.sender], filename: 'undefined.pdf', mimetype: 'application/pdf' }) => conn.sendMessage(id, { document: doc, mimetype: option.mimetype, fileName: option.filename, contextInfo: { mentionedJid: option.mentions } }, { quoted: m })
			m.replyContact = (name, info, number) => {
				var vcard = 'BEGIN:VCARD\\n' + 'VERSION:3.0\\n' + 'FN:' + name + '\\n' + 'ORG:' + info + ';\\n' + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\\n' + 'END:VCARD'
				conn.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: m })
			}
			m.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } })
			m.sendSticker = async (jid, buffer, options) => {
				let type = m.quoted;
				if(type.imageMessage) {
					let stickerBuffer = await imageToWebP(buffer, {
						packname: options
					})
					return conn.sendMessage(jid, { sticker: stickerBuffer })
				}
				if(type.videoMessage) {
					let stickerBuffer = await videoToWebP(buffer, {
						packname: options
					})
					return conn.sendMessage(jid, { sticker: stickerBuffer })
				}
			}
            
            // --- NEW BUTTON FUNCTIONS START HERE ---

            // Function to send a text message with quick-reply buttons
            m.replyButton = async (text, buttons, footer = '', quoted = m) => {
                // buttons should be an array of arrays: [['Button 1 Text', 'button-id-1'], ['Button 2 Text', 'button-id-2']]
                let buttonMessage = {
                    text: text,
                    footer: footer,
                    buttons: buttons.map((btn, index) => ({
                        buttonId: btn[1] || `button-id-${index}`,
                        buttonText: { displayText: btn[0] },
                        type: 1 // Quick Reply Button Type
                    })),
                    headerType: 1 // TEXT Header Type
                }
                await conn.sendMessage(m.chat, buttonMessage, { quoted: quoted })
            }

            // Function to send an image message with quick-reply buttons
            m.replyImgButton = async (buffer, text, buttons, footer = '', quoted = m) => {
                // buffer is the image data (Buffer)
                // buttons format is the same as m.replyButton

                // 1. Prepare the media (image) for upload
                let media = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
                
                // 2. Build the final message content using generateWAMessageFromContent
                let message = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    buttonsMessage: {
                        caption: text,
                        imageMessage: media.imageMessage,
                        footerText: footer,
                        buttons: buttons.map((btn, index) => ({
                            buttonId: btn[1] || `button-id-${index}`,
                            buttonText: { displayText: btn[0] },
                            type: 1
                        })),
                        headerType: 4 // IMAGE Header Type
                    }
                }), { quoted: quoted })
                
                // 3. Send the message
                return conn.relayMessage(m.chat, message.message, { messageId: message.key.id })
            }

            // --- NEW BUTTON FUNCTIONS END HERE ---
		}
	}
	return m
}

module.exports = {
	sms,
	downloadMediaMessage
				}*/
