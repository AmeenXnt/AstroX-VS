const config = require('../config')
const {Astro , commands} = require('../command')


// owner join 

Astro({
    pattern: "join",
    desc: "bot join to group",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, 
		    isCmd, command, args, 
		    q, isGroup, sender, 
		    senderNumber, botNumber2, 
		    botNumber, pushname, isMe, 
		    isOwner, groupMetadata, 
		    groupName, participants, 
		    groupAdmins, isBotAdmins, 
		    isAdmins, reply}) => {
	
	if (!q) return reply("_🔰Give me a Whatsapp Group Link for join_");
	try {
    var Fek = q
    if (Fek.includes('https://chat.whatsapp.com/')) {
    var CalciFer = Fek.replace('https://chat.whatsapp.com/', '')
    var nimmi = await conn.groupAcceptInvite(CalciFer)
	    return reply('_Joined..!✅_')
    } else {
        return reply('_U are smart!_ _Dont be over smart!😎_')
    }
}catch(e){
console.log(e)
reply(`${e}`)
	}})


// Next Plugins🔰
