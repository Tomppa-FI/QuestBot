export default class QuestData {
    constructor(channel) {
        this.channel = channel;
        this.players = new Map();
        this.canPlayersJoin = true;
    }

    getChannel = () => {
        return this.channel;
    }

    getPlayers = () => {
        return this.players;
    }

    addPlayer = player => {
        this.players.set(player.id, player);
        this.channel.send(`${player.username} has joined the Quest!`);
    }

    removePlayer = playerID => {
        this.players.delete(playerID);
    }

    getCanPlayersJoin = () => {
        return this.canPlayersJoin;
    }

    setCanPlayersJoin = val => {
        this.canPlayersJoin = val;
    }
}