import { getConnection } from "./client/discord";
import { registerGuild, handleMsg } from "./command/CommandManager";

const run = async () => {
    getConnection().then(client => {
        console.log(`Client connected as ${client.user.tag}`);
        console.log(`Invite the client to your server at https://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot`);
        for (const guildID of client.guilds.keys()) {
            registerGuild(guildID);
        }

        client.on("message", msg => {
            handleMsg(msg);
        })

        client.on("guildCreate", guild => {
            registerGuild(guildID)
        })
    })
}

run();