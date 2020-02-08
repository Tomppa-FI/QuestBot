import QuestComponent from "../QuestComponent";

export default class DestroyedCamp extends QuestComponent {
    constructor(questData) {
        super(questData);
    }

    componentStart = async () => {
        this.sendMessage(
`You stumble upon a destroyed campsite!
Blood is all over the ground, and it is clear any survivors left in a hurry.
Do you choose to hunt for the culprits, or add defences to the camp in case they return?
Make your choice with !hunt or !defend`
        );
        await this.delayBySecs(30);

    }

    componentMain = async () => {

    }

    componentEnding = async () => {

    }
}