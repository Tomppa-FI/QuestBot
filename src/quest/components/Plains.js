import QuestComponent from "./QuestComponent";
import getQuestEvent from "../../utils/getQuestEvent";
import { PLAINS } from "../questConstants";

export default class Plains extends QuestComponent {
    constructor(questData) {
        super(questData);
    }

    componentStart = async () => {
        this.sendMessage(`You party begins to cross large, open plains...`);
        await this.delayBySecs(5);
    }

    componentMain = async () => {
        const event = getQuestEvent(PLAINS, this.getPlayerCount());
        await new event(this.questData).execute();
    }

    componentEnding = async () => {

    }
}