class Customer {
    constructor(name, membershipLevel) {
        this.name = name
        this.membershipLevel = membershipLevel
        this.purchaseAmount = 0
    }

    calculateDiscount() {
        if (this.purchaseAmount > 1000) {
            switch (this.membershipLevel) {
                case 1: return 0.8
                case 2: return 0.7
                default: return 0.9
            }
        } else {
            switch (this.membershipLevel) {
                case 1: return 0.9
                case 2: return 0.8
                default: return 1
            }
        }
    }
}