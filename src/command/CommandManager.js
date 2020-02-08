import fs from "fs";
const commandFiles = fs.readdirSync("./src/command/commands/").filter(item => item.endsWith(".js"));
const guildAllowedCommands = new Map();
const prefix = "!";

export const handleMsg = (msg) => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) {
        return;
    }
    const guildID = msg.channel.guild.id;
    const [cmd, ...args] = msg.content.slice(prefix.length).split(" ").map(item => item.toLowerCase());
    if (guildAllowedCommands.get(guildID).find(item => item === cmd)) {
        loadCommand(cmd).then(cmdFile => {
            cmdFile.execute(msg.author, msg.channel, args);
        })
    }
}

export const registerGuild = (guildID) => {
    guildAllowedCommands.set(guildID, []);
    enableCommands(guildID, "queststart", "quest");
}

export const enableCommands = (guildID, ...commands) => {
    for (const command of commands) {
        guildAllowedCommands.get(guildID).push(command);
    }
}

export const disableCommands = (guildID, ...commands) => {
    let commandList = guildAllowedCommands.get(guildID);
    for (const command of commands) {
        for (let i = 0; i < commandList.length; i++) {
            if (commandList[i] === command) {
                commandList.splice(i, 1);
            }
        }
    }
}

const loadCommand = cmd => {
    return import(`./commands/${cmd}.js`);
}
