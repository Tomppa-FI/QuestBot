import { isQuestRunning, isPlayerInQuest, addPlayerToQuest } from "../../quest/questManager";

export const name = "Quest";
export const description = "Adds a player to a Quest."
export const execute = (author, channel, args) => {
    const guildID = channel.guild.id;
    if (isQuestRunning(guildID)) {
        if (!isPlayerInQuest(guildID, author.id)) {
            addPlayerToQuest(guildID, author);
        }
    }
}