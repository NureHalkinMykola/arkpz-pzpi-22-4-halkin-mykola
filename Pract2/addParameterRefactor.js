class Customer {
    constructor(name, membershipLevel) {
        this.name = name
        this.membershipLevel = membershipLevel
        this.purchaseAmount = 0
    }

    calculateDiscount(promo = 1) {
        if (this.purchaseAmount > 1000) {
            switch (this.membershipLevel) {
                case 1: return (0.8 * promo)
                case 2: return (0.7 * promo)
                default: return (0.9 * promo)
            }
        } else {
            switch (this.membershipLevel) {
                case 1: return (0.9 * promo)
                case 2: return (0.8 * promo)
                default: return (1 * promo)
            }
        }
    }
}