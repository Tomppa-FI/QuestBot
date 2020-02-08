export default class QuestComponent {
    constructor(questData) {
        this.questData = questData;
    }

    sendMessage = msg => {
        this.questData.getChannel().send(msg);
    }

    delayByMins = mins => {
        return new Promise(resolve => setTimeout(resolve, (mins * 60000)));
    }

    delayBySecs = secs => {
        return new Promise(resolve => setTimeout(resolve, (secs * 1000)));
    }

    getPlayerCount = () => {
        return this.questData.getPlayers().size;
    }

    printPlayers = () => {
        const players = this.questData.getPlayers();
        let msg = "";
        for (const player of players.values()) {
            msg += `${player.username}, Level ${player.level} (${player.job})`;
        }
        this.sendMessage(msg);
    }

    execute = async () => {
        await this.componentStart();
        await this.componentMain();
        await this.componentEnding();
    }
}