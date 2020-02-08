import { isQuestRunning, startQuest } from "../../quest/questManager";

export const name = "QuestStart";
export const description = "Begins a new Quest";
export const execute = (author, channel, args) => {
    const guildID = channel.guild.id;
    if (isQuestRunning(guildID)) {
        channel.send("A Quest is already running for this Server.");
    } else {
        startQuest(guildID, channel);
    }
}