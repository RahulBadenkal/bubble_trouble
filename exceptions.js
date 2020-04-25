class GameEnd extends Error {
    constructor(message) {
        super(message);
        this.name = "GameEnd";
    }
}