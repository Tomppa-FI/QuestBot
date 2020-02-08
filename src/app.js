import { getConnection } from "./client/discord";
import CommandManager from "./command/CommandManager";
const CommandManagers = new Map();

const run = async () => {
    getConnection().then(client => {
        console.log(`Client connected as ${client.user.tag}`);
        client.on("message", msg => {
            if (msg.content.startsWith("!") && !msg.author.bot) {
                handleMsg(msg);
            }
        })
    })
}

const handleMsg = async msg => {
    const channel = msg.channel;
    const guildID = msg.channel.guild.id;
    const author = msg.author;
    let [cmd, ...args] = msg.content.slice(1).split(" ").map(element => element.toLowerCase());
    if (!CommandManagers.has(guildID)) {
        CommandManagers.set(guildID, new CommandManager(channel));
        await CommandManagers.get(guildID).loadCommands("quest", "queststart"); //Load default commands before execution.
    }
    CommandManagers.get(guildID).handleCommand(cmd, author, args);
}

run();