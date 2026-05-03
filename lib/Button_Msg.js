const {
    generateWAMessageFromContent, 
    proto 
} = require('@eypzx/baileys');

/**
 * Sends a text message with quick-reply buttons using the Baileys connection object.
 * This is the equivalent of the older conn.sendButton in modern Baileys.
 * * @param {import('@eypzx/baileys').WASocket} conn - The Baileys socket connection.
 * @param {string} jid - The recipient chat ID (e.g., '91xxxx@s.whatsapp.net').
 * @param {string} text - The main message text.
 * @param {Array<Array<string>>} buttons - Array of button arrays: [['Button Text', 'button-id']].
 * @param {string} [footer=''] - The footer text.
 * @param {object} [quoted={}] - The message to quote (optional, pass m for a reply).
 */
const sendButton = async (conn, jid, text, buttons, footer = '', quoted = {}) => {
    // Safety check and fallback to simple text message
    if (!Array.isArray(buttons) || buttons.length === 0) {
        return conn.sendMessage(jid, { text: text + '\n' + footer }, { quoted: quoted });
    }
    
    const buttonMessage = {
        text: text,
        footer: footer,
        buttons: buttons.map((btn, index) => ({
            buttonId: btn[1] || `button-id-${index}`,
            buttonText: { displayText: btn[0] },
            type: 1 // Quick Reply Button Type
        })),
        headerType: 1 // TEXT Header Type (for plain text header)
    };
    
    // Use conn.sendMessage to send the constructed button message object
    await conn.sendMessage(jid, buttonMessage, { quoted: quoted });
};


module.exports = {
    sendButton
    // You could also add a sendImageButton function here if needed
};
