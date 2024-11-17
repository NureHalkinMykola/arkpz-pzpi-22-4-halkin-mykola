class PlayerPerformance {
    constructor() {
        this.lives = 5
        this.gamesPlayed = 0
    }

    scoreCalc() {
        return this.lives * this.gamesPlayed
    }
}

class Player {
    constructor(name) {
        this.name = name
        this.score = 0
        this.performance = new PlayerPerformance
    }

    updateScore() {
        this.score = this.performance.scoreCalc()
    }
}