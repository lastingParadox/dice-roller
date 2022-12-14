class DiceInitializeError extends Error {
    constructor(message) {
        super(message);
        this.name = DiceInitializeError;
    }
}

class Dice {

    number;
    amount;
    total = 0;
    dieRolls = [];
    low = 0;
    high = 0;

    constructor (roll) {

        roll = [...roll.matchAll(/(\d+)d(\d+)|d(\d+)/g)];
        roll = roll[0];

        if (roll[0].includes('d')) {
            if (roll[1] === undefined)
                this.number = 1;
            else
                this.number = parseInt(roll[1]);
            if (roll[2] !== undefined)
                this.amount = parseInt(roll[2]);
            else
                this.amount = parseInt(roll[3]);
        }
        else {
            throw new DiceInitializeError("Invalid dice syntax");
        }

        if (isNaN(this.number)) {
            throw new DiceInitializeError("Invalid number of rolls provided");
        }
        else if (isNaN(this.amount)) {
            throw new DiceInitializeError("Invalid amount for roll provided");
        }

        this.calculate();
    }

    calculate() {
        if (this.amount === 0) {
            this.dieRolls.push(0)
            this.total = 0;
            this.low = 0;
            this.high = 0;
        }
        else {
            for (let i = 0; i < this.number; i++) {
                this.low += 1;
                this.high += this.amount;

                let rollAmount = Math.floor(Math.random() * this.amount) + 1;

                this.dieRolls.push(rollAmount);
                this.total += rollAmount;
            }
        }
    }
}

module.exports = Dice;