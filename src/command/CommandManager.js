import fs from "fs";
const commandFiles = fs.readdirSync("./src/command/commands/").filter(file => file.endsWith(".js"));

export default class CommandManager {
    constructor(channel) {
        this.channel = channel;
        this.commandMap = new Map();
    }

    handleCommand = (cmd, author, args) => {
        if (this.commandMap.has(cmd)) {
            this.commandMap.get(cmd).execute(author, this.channel, args);
        } else {
            console.log(`Invalid Command ${cmd}`); //Throw err in future.
        }
    }

    loadCommands = async (...commands) => {
        for (const command of commands) {
            if (commandFiles.find(element => element === `${command}.js`)) {
                const cmdFile = await import(`./commands/${command}.js`);
                this.commandMap.set(cmdFile.name.toLowerCase(), cmdFile);
            } else {
                console.log(`${command}.js not found.`); //Throw err in future.
            }
        }
    }

    removeCommands = async (...commands) => {
        for (const command of commands) {
            if (this.commandMap.has(command)) {
                this.commandMap.delete(command);
            } else {
                console.log(`CommandMap does not contain ${command}. Review.`);
            }
        }
    }
}