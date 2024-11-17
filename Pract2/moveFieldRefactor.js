class PlayerPerformance {
    constructor() {
        this.lives = 5
        this.gamesPlayed = 0
        this.score = 0
    }

    scoreCalc() {
        this.score = this.lives * this.gamesPlayed
    }
}

class Player {
    constructor(name) {
        this.name = name
        this.performance = new PlayerPerformance
    }
}