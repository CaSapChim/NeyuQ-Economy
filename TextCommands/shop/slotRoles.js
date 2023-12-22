const Discord = require('discord.js');
const Probability = require('probability-node');
const emoji = require('../../emoji.json');
const price = require('../../data/price.json');

const roleObj = {
    1: {
        id: "1187753935717544060"
    },
    2: {
        id: "1187753934291476582"
    },
    3: {
        id: "1187753930826989720"
    },
    4: {
        id: "1187753926787858562"
    },
    5: {
        id: "1187753940704563360"
    },
    6: {
        id: "1187753792154910772"
    },
    7: {
        id: "1187753691692933280"
    },
    8: {
        id: "1187753567663181875"
    },
    9: {
        id: "1187753434422726696"
    },
    10: {
        id: "1187753336330526870"
    },
    12: {
        id: "1187752652201795624"
    },
    12: {
        id: "1183774751836086302"
    },
}

module.exports = {
    name: "slotrole",
    aliases: ["sr"],
    description: "Quay slot kiếm role",
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const author = message.member;
        const slots = [
            "<:1_:1187187920407363624>",
            "<:2_:1187187924505202769>",
            "<:3_:1187187928712085544>",
            "<:4_:1187187931241259120>",
            "<:5_:1187187934772867082>",
            "<:6_:1187187938883293285>",
            "<:7_:1187719697328771122>", 
            "<:8_:1187719701153980457>",
            "<:9_:1187719705025327196>",
            "<:10:1187719707126673528>",
            "<:11:1187719710859608095>", 
            "<:12:1187719713011269802>",
]
        const moving = `<a:gift22:1187036860149665832>`;

        const tokenBal = await client.xemToken(message.author.id);
        if (tokenBal < price.slot) 
            return message.reply(`${emoji.fail} Bạn không đủ **${price.slot} token ${emoji.token}** để slot roles!`);
        await client.truToken(message.author.id, price.slot);

        const rsEmbedFunc = (roleNum) => {
            const rsEmbed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Chúc mừng, bạn đã nhận được <@${roleObj[roleNum].id}>`)
                .setTimestamp()
            return message.channel.send({content: `<@${message.author.id}>`, embeds: [rsEmbed] });
        }

        let rslots = [];
        let roleNum = 0;
        const rand = [
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[0]); 
                    rslots.push(slots[0]); 
                    rslots.push(slots[0]);
                    roleNum = 1;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[1]); 
                    rslots.push(slots[1]); 
                    rslots.push(slots[1]);
                    roleNum = 2;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[2]); 
                    rslots.push(slots[2]); 
                    rslots.push(slots[2]);
                    roleNum = 3;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[3]); 
                    rslots.push(slots[3]); 
                    rslots.push(slots[3]);
                    roleNum = 4;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[4]); 
                    rslots.push(slots[4]); 
                    rslots.push(slots[4]);
                    roleNum = 5;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[5]); 
                    rslots.push(slots[5]); 
                    rslots.push(slots[5]);
                    roleNum = 6;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[6]); 
                    rslots.push(slots[6]); 
                    rslots.push(slots[6]);
                    roleNum = 7;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[7]); 
                    rslots.push(slots[7]); 
                    rslots.push(slots[7]);
                    roleNum = 8;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[8]); 
                    rslots.push(slots[8]); 
                    rslots.push(slots[8]);
                    roleNum = 9;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[9]); 
                    rslots.push(slots[9]); 
                    rslots.push(slots[9]);
                    roleNum = 10;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[10]); 
                    rslots.push(slots[10]); 
                    rslots.push(slots[10]);
                    roleNum = 11;
                } 
            },
            { 
                p: 5, f: async() => { 
                    rslots.push(slots[11]); 
                    rslots.push(slots[11]); 
                    rslots.push(slots[11]);
                    roleNum = 12;
                } 
            },
            { 
                p: 40, f: async() => { 
                    var slot1 = Math.floor(Math.random() * (slots.length - 1));
                    var slot2 = Math.floor(Math.random() * (slots.length - 1));
                    var slot3 = Math.floor(Math.random() * (slots.length - 1));

                    if (slot3 == slot1)
					    slot2 = (slot1 + Math.ceil(Math.random() * (slots.length - 2))) % (slots.length - 1);
                    if (slot2 == slots.length - 2) slot2++;

                    rslots.push(slots[slot1]);
                    rslots.push(slots[slot2]);
                    rslots.push(slots[slot3]);
                } 
            },
        ]
        const probabilitilized = new Probability(...rand.map(entry => ({ p: `${entry.p}%`, f: entry.f })));
        await probabilitilized();

        let winmsg = roleNum == 0 ? "cái nịt" : "một role...";
        const authorName = `<@${author.id}>`

        let displaySlots = 
        '**    `___ROLES___`**\n ` ` ' +
        moving +
        '  ' +
        moving +
        '  ' +
        moving +
        ' ` ` ' +
        authorName +
        ' đã bỏ ra 10 tokens <:token:1181941410446979122> và...' +
        '\n  `=============`\n  `====[...]====`';
      
      let a = await message.channel.send(displaySlots);
      
      setTimeout(async () => {
        let displaySlots = 
        '**    `___ROLES___`**\n ` ` ' +
        rslots[0] +
        '  ' +
        moving +
        '  ' +
        moving +
        ' ` ` ' +
        authorName +
        ' đã bỏ ra 10 tokens <:token:1181941410446979122> và...' +
        '\n  `=============`\n  `====[...]====`';
        (await a).edit(displaySlots);
      
        setTimeout(async () => {
          let displaySlots = 
          '**    `___ROLES___`**\n ` ` ' +
          rslots[0] +
          '  ' +
          moving +
          '  ' +
          rslots[2] +
          ' ` ` ' +
          authorName +
          ' đã bỏ ra 10 tokens <:token:1181941410446979122> và...' +
          '\n  `=============`\n  `====[...]====`';
          (await a).edit(displaySlots);
      
          setTimeout(async () => {
            let displaySlots = 
            '**    `___ROLES___`**\n ` ` ' +
            rslots[0] +
            '  ' +
            rslots[1] +
            '  ' +
            rslots[2] +
            ' ` ` ' +
            authorName +
            ' đã bỏ ra 10 tokens <:token:1181941410446979122> và...' +
            '\n  `=============`   và nhận được ' +
            winmsg +
            '\n  `====[...]====`';
            (await a).edit(displaySlots);
            if (roleNum != 0)
                await rsEmbedFunc(roleNum);
          }, 1000)
        }, 700);
      }, 1000);
    }
}