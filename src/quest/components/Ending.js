import QuestComponent from "./QuestComponent";

export default class Ending extends QuestComponent {
    constructor(questData) {
        super(questData);
    }

    componentStart = async () => {
        
    }

    componentMain = async () => {

    }

    componentEnding = async () => {
        this.sendMessage(`Your Quest has Ended. Congratulations to all participants!`);
        this.printPlayers();
    }
}