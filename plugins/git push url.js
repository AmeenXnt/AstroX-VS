// this is the plugin which is usedto when a user send a vdo or audio or image file and send quated !url command to it it will push to AmeenXnt/ameen-api/Media and give a random name to tht file and edit index.js fille and give a app for it and return the url of the file to user
const config = require('../config')
const {
    commands,
    Astro
} = require('../command');
const util = require('util');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

Astro({
        pattern: "murl",
        desc: "Git Push URL",
        react: "📤",
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
        reply,
        ameen
    }) => {
        if (!isOwner) return reply("❌ This command is only for the bot owner.");
        if (!quoted) return reply("❌ Please reply to a media message (video, image, or audio) with the `.url` command.");
        const messageType = quoted.imageMessage.mimetype || quoted.videoMessage.mimetype || quoted.audioMessage.mimetype;
        let mediaType; 
        if (/video/.test(messageType)) {
            mediaType = "video";
        } else if (/image/.test(messageType)) {
            mediaType = "image";
        } else if (/audio/.test(messageType)) {
            mediaType = "audio";
        } else {
            return reply("❌ Only video, image, or audio messages are supported.");
        }
        try {
            const mediaPath = await conn.downloadAndSaveMediaMessage(quoted);
            const fileName = path.basename(mediaPath);
            const randomName = `${Date.now()}_${fileName}`;
            const destinationPath = path.join(__dirname, '..', 'Media', randomName);
            fs.renameSync(mediaPath, destinationPath);
            const gitCommands = [
                `cd ${path.join(__dirname, '..')}`,
                'git pull',
                `git add Media/${randomName}`,
                `git commit -m "Add media file ${randomName}"`,
                'git push'
            ].join(' && ');
            exec(gitCommands, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing git commands: ${error}`);
                    return reply("❌ Failed to push the media file to GitHub. Please try again.");
                }
                const fileUrl = `https://raw.githubusercontent.com/AmeenXnt/ameen-api/main/Media/${randomName}`;
                reply(`✅ Successfully pushed the media file to GitHub. Here is the URL:\n${fileUrl}`);
            });
        } catch (error) {
            console.error(error);
            reply("❌ Failed to process the media file. Please try again.");
        }
    }
);
