const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
PREFIX: process.env.PREFIX || "!",
NUMBER: process.env.NUMBER || "584264206449",
ALIVE_IMG: process.env.ALIVE_IMG || "https://ik.imagekit.io/Astro/1727903040279_XEWG3FC67.png",
ALIVE_MSG: process.env.ALIVE_MSG || " *CRONAZ-XD ALIVE🌸*\n\n*Owner:* Cronex\n\n_Nothing Is Impossible. Motivate Your Own Self🙈_ ",
OWNER_NAME: process.env.OWNER_NAME || "AmeenInT",
MENU: process.env.MENU || "https://v7-tool.vercel.app/PNG/menu.png",
MENU1: process.env.MENU1 || "https://ironman.koyeb.app/ironman/anime/waifu?type=long_hair",
BOT_NAME: process.env.BOT_NAME || "AstroX-V2",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
wait: "⏳",
done: "✅",
fail: "❌"
};
