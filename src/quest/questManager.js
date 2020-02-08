import QuestData from "./QuestData";
import Beginning from "./components/Beginning";
import Ending from "./components/Ending";
import QuestError from "../utils/QuestError";
import getPath from "../utils/getPath";

const questMap = new Map();

export const isQuestRunning = guildID => {
    return questMap.has(guildID);
}

export const startQuest = async (guildID, channel) => {
    const questData = new QuestData(channel);
    questMap.set(guildID, questData);
    try {
        await new Beginning(questData).execute();
        const pathComponents = getPath(questData.getPlayers().size);
        for (const component of pathComponents) {
            await new component(questData).execute();
        }
        await new Ending(questData).execute();
    } catch (e) {
        if (e instanceof QuestError) {
            channel.send(e.message);
        } else {
            channel.send(`Error: ${e.message}`);
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
        const player = {
            id: author.id,
            username: author.username,
            level: 1,
            job: "Default"
        }
        quest.addPlayer(player);
    }
}