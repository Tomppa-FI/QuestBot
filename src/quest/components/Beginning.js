import QuestComponent from "./QuestComponent";
import QuestError from "../../utils/QuestError";

export default class Beginning extends QuestComponent {
    constructor(questData) {
        super(questData);
    }

    componentStart = async () => {
        this.sendMessage(`A Quest will begin in 3 minutes. Please type !quest to participate.`);
        await this.delayBySecs(3);
    }

    componentMain = async () => {
        if (this.getPlayerCount() === 0) {
            throw new QuestError("Nobody joined the Quest");
        }
    }

    componentEnding = async () => {
        this.sendMessage("The Quest has begun! Good luck to all participants");
        this.printPlayers();
        await this.delayBySecs(15);
    }

}