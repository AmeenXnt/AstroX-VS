
const {Astro , commands} = require('../command')
var axios = require('axios');
Astro({
    pattern: "neko",
    desc: "random img",
    react: '🧧',
    category: "main",
    filename: __filename
},
async (conn, m) => {
    var res = await axios.get("https://ironman.koyeb.app/ironman/neko");
    await conn.sendMessage(m.chat, { image: { url: res.data.ironman.url }, caption: "neko" });
});


////✅️/✅️✅️/✅️//✅️
