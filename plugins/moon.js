// a rounding moon by AMEEN ASTROX
const config = require('../config')
const { commands, Astro } = require('../command'); 
Astro({
    pattern: "moon",
    desc: "Set custom ping message type.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, body, reply }) => {
    try {

var moon = await conn.sendMessage(from, { text: "🌕"})
var moon1 = await conn.sendMessage(from, { text: "🌖", edit: moon.key })
var moon2 = await conn.sendMessage(from, { text: "🌗", edit: moon1.key })
var moon3 = await conn.sendMessage(from, { text: "🌘", edit: moon2.key })
var moon4 = await conn.sendMessage(from, { text: "🌑", edit: moon3.key })
var moon5 = await conn.sendMessage(from, { text: "🌒", edit: moon4.key })
var moon6 = await conn.sendMessage(from, { text: "🌓", edit: moon5.key })
var moon7 = await conn.sendMessage(from, { text: "🌔", edit: moon6.key })
/*var moon8 = await conn.sendMessage(from, { text: "🌕", edit: moon7.key })
var moon9 = await conn.sendMessage(from, { text: "🌖", edit: moon8.key })
var moon10 = await conn.sendMessage(from, { text: "🌗", edit: moon9.key })
var moon11 = await conn.sendMessage(from, { text: "🌘", edit: moon10.key })
var moon12 = await conn.sendMessage(from, { text: "🌑", edit: moon11.key })*/
var moon13 = await conn.sendMessage(from, { text: "_Moon Cycle by Ameen AstroX_", edit: moon7.key })
//🌕🌖🌗🌘🌑🌒🌓🌔

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


//teddy with love hearts

Astro({
    pattern: "teddy",
    desc: "Set custom ping message type.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, body, reply }) => {
    try {
/*
^⁠_⁠_⁠^\n(⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)\n(  >❤️

*/

var tobj = "^⁠_⁠_⁠^\n(⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)\n(  >"
var teddy = await conn.sendMessage(from, { text: tobj+"❤️" })
var teddy1 = await conn.sendMessage(from, { text: tobj+"💔", edit: teddy.key })
var teddy2 = await conn.sendMessage(from, { text: tobj+"💕", edit: teddy1.key })
var teddy3 = await conn.sendMessage(from, { text: tobj+"💖", edit: teddy2.key })
var teddy4 = await conn.sendMessage(from, { text: tobj+"💗", edit: teddy3.key })
var teddy5 = await conn.sendMessage(from, { text: tobj+"💓", edit: teddy4.key })
var teddy6 = await conn.sendMessage(from, { text: tobj+"🤍", edit: teddy5.key })
var teddy7 = await conn.sendMessage(from, { text: tobj+"🖤", edit: teddy6.key })
/*var moon8 = await conn.sendMessage(from, { text: "🌕", edit: moon7.key })
var moon9 = await conn.sendMessage(from, { text: "🌖", edit: moon8.key })
var moon10 = await conn.sendMessage(from, { text: "🌗", edit: moon9.key })
var moon11 = await conn.sendMessage(from, { text: "🌘", edit: moon10.key })
var moon12 = await conn.sendMessage(from, { text: "🌑", edit: moon11.key })*/
var teddy13 = await conn.sendMessage(from, { text: "_Teddy by Ameen AstroX_", edit: teddy7.key })
//🌕🌖🌗🌘🌑🌒🌓🌔

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
