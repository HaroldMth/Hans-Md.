/**
========================================================
                                                                                  
// ░▒█░▄▀░▀█▀░▒█▄░▒█░▒█▀▀█░░░░▒█▀▄▀█░▒█▀▀▄ //
// ░▒█▀▄░░▒█░░▒█▒█▒█░▒█░▄▄░▀▀░▒█▒█▒█░▒█░▒█ //
// ░▒█░▒█░▄█▄░▒█░░▀█░▒█▄▄▀░░░░▒█░░▒█░▒█▄▄█ //

========================================================

This Project Is Under Apache-2.0 License.
So, No One Have Permission To Copy This Project,
Reupload, Reversed Engineering And Any Kind Of Deobfuscation Not Allowed 
Otherwise, A Legal Github Copyright Action Will Be Taken Against You And Your 
Account And Repo Banned 

 * @project_name : KING-MD                                                                    
 * @author : naveeddogar <https://github.com/naveeddogar>   
 * @description : KING-MD ,A Multi-Functional Whatsapp Bot Create By Naveed Dogar.       
 * @version : 1.2.9
 * @license : Apache-2.0
 ========================================================
 **/
 
const { tlang, cmd, sleep, getBuffer, prefix, Config } = require('../lib')
const ytdl = require('ytdl-secktor')
const yts = require('secktor-pack')
const fs = require('fs')
var videotime = 60000 // 1000 min
var dlsize = 250 // 250mb


cmd({
            pattern: "playlist",
            desc: "Downloads video from playlist.",
            category: "downloader",
            filename: __filename,
            use: '<yt playlist url>',
        },
        async(Void, citel, text) => {
  
            const getRandom = (ext) => {  return `${Math.floor(Math.random() * 10000)}${ext}`;  };
            if (!text) {
                citel.reply(`❌Please provide me a url`);
                return;
            }
let urlYtt = text.split('=')[1]
console.log(urlYtt)
var opts = { listId: urlYtt }
yts( opts, async function ( err, playlist ) {
	if ( err ) throw err
  citel.reply('This Process will take a bit time.');
  for (let i=0;i<playlist.videos.length;i++){
    if(playlist.videos[i].videoId===undefined) continue
    let urlYt = playlist.videos[i].videoId
    try {
      
        
        let infoYt = await ytdl.getInfo(urlYt);
                if (infoYt.videoDetails.lengthSeconds >= videotime) continue
                let titleYt = infoYt.videoDetails.title;
                let randomName = getRandom(".mp4");

                const stream = ytdl(urlYt, {
                        filter: (info) => info.itag == 22 || info.itag == 18,
                    })
                    .pipe(fs.createWriteStream(`./${randomName}`));
                await new Promise((resolve, reject) => {
                    stream.on("error", reject);
                    stream.on("finish", resolve);
                });
                let stats = fs.statSync(`./${randomName}`);
                let fileSizeInBytes = stats.size;
                let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes <= dlsize) {
                    let yts = require("secktor-pack");
                    let search = await yts(text);
                    let buttonMessage = {
                        video: fs.readFileSync(`./${randomName}`),
                        jpegThumbnail: log0,
                        mimetype: 'video/mp4',
                        fileName: `${titleYt}.mp4`,
                        caption: ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${fileSizeInMegabytes} MB`,
                        headerType: 4,
                        contextInfo: {
                            externalAdReply: {
                                title: Config.botname,
                                body: citel.pushName,
                                thumbnail: log0,
                                renderLargerThumbnail: true,
                                mediaType: 2,
                                mediaUrl: 'https://www.whatsapp.com/channel/0029VaZDIdxDTkKB4JSWUk1O',
                                sourceUrl: 'https://www.whatsapp.com/channel/0029VaZDIdxDTkKB4JSWUk1O'
                            }
                        }
                    }
                   Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                } else {
                    citel.reply(`❌ File size bigger than ${dlsize}mb.`);
                }

                fs.unlinkSync(`./${randomName}`);
            } catch (e) {
                console.log(e)
            }
            }})
        }
    )
