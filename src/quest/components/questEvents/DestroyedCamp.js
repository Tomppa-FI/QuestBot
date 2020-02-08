import QuestComponent from "../QuestComponent";

export default class DestroyedCamp extends QuestComponent {
    constructor(questData) {
        super(questData);
    }

    componentStart = async () => {
        this.sendMessage(`You encounter a destroyed Campsite!`);
    }

    componentMain = async () => {

    }

    componentEnding = async () => {

    }
}