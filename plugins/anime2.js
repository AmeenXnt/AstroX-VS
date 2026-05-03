const axios = require('axios');
const {Astro, commands } = require('../command');

Astro({
    pattern: "anime1",
    desc: "Fetch a random anime image.",
    category: "fun",
    react: "♥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '❤️ *CRONAZ XD RANDOM ANIME  IMAGES* ♥️\n\n\n *🧬©CRONAZ-XD*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Boy image*: ${e.message}`);
    }
});

Astro({
    pattern: "anime1",
    desc: "Fetch a random anime image.",
    category: "fun",
    react: "❤️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '❤️ *CRONAZ XD RANDOM ANIME B IMAGES* ❤️\n\n\n *🧬©CRONAZ XD*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Boy image*: ${e.message}`);
    }
});

Astro({
    pattern: "anime2",
    desc: "Fetch a random anime  image.",
    category: "fun",
    react: "❤️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '❤️ *CRONAZ XD RANDOM ANIME  IMAGES* ❤️\n\n\n *🧬©CRONAZ XD*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Boy image*: ${e.message}`);
    }
});

Astro({
    pattern: "anime3",
    desc: "Fetch a random anime  image.",
    category: "fun",
    react: "❤️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '❤️ *CRONAZ XD RANDOM ANIME  IMAGES* ❤️\n\n\n *🧬©CRONAZ XD*' }, { quoted: mek });    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

Astro({
    pattern: "anime4",
    desc: "Fetch a random anime  image.",
    category: "fun",
    react: "❤️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '❤️ *CRONAZ XD RANDOM ANIME  IMAGES* ❤️\n\n\n *🧬©CRONAZ XD CRONAZ XD*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime boy image*: ${e.message}`);
    }
});

Astro({
    pattern: "anime5",
    desc: "Fetch a random anime  image.",
    category: "fun",
    react: "❤️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '❤️ *CRONAZ-XD RANDOM ANIME IMAGES* 👸\n\n\n *🧬©CRONAZ XD*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Boy image*: ${e.message}`);
    }
});
