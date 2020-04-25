class GameEnd extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "GameEnd"; // (2)
    }
}