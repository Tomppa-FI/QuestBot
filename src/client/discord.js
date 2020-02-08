import fs from "fs";
import * as Discord from "discord.js";
const TOKEN = JSON.parse(fs.readFileSync("./config/config.json")).discord.token;
let client;

export const getConnection = () => {
    if (client) {
        if (client.status < 3) {
            return client;
        }
    }
    client = new Discord.Client();
    return client.login(TOKEN).then(() => {
        return client;
    })
}