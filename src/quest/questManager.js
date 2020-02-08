import QuestData from "./QuestData";
import Beginning from "./components/Beginning";
import QuestError from "../utils/QuestError";

const questMap = new Map();

export const isQuestRunning = guildID => {
    return questMap.has(guildID);
}

export const startQuest = async (guildID, channel) => {
    const questData = new QuestData(channel);
    questMap.set(guildID, questData);
    try {
        await new Beginning(questData).execute();
    } catch (e) {
        if (e instanceof QuestError) {
            channel.send(`Ending Quest - ${e.message}`);
        } else {
            console.log(e);
        }
    } finally {
        questMap.delete(guildID);
    }
}
 
export const isPlayerInQuest = (guildID, authorID) => {
    return questMap.get(guildID).getPlayers().has(authorID);
}

export const addPlayerToQuest = (guildID, author) => {
    const quest = questMap.get(guildID);
    if (quest.getCanPlayersJoin()) {
        const Player = {
            id: author.id,
            username: author.username
        }
        quest.addPlayer(Player);
    }
}