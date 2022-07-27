class CombinationLock {
    constructor(combination) {
        this.combination = combination;
        this.reset();
    }

    reset() {
        this.status = 'LOCKED';
        this.digitsEntered = 0;
        this.failed = false;
    }

    enterDigit(digit) {
        if (this.status === 'LOCKED')
            this.status = '';
        this.status += digit.toString();
        if (this.combination[this.digitsEntered] !== digit) {
            this.failed = true;
        }
        this.digitsEntered++;

        if (this.digitsEntered === this.combination.length)
            this.status = this.failed ? 'ERROR' : 'OPEN';
    }
}



let cl = new CombinationLock([1, 2, 3, 4, 5]);
console.log('Initial status: ' + cl.status);
cl.enterDigit(1);
console.log('Current status: ' + cl.status);

cl.enterDigit(2);
console.log('Current status: ' + cl.status);

cl.enterDigit(3);
console.log('Current status: ' + cl.status);

cl.enterDigit(4);
console.log('Current status: ' + cl.status);

cl.enterDigit(5);
console.log('Current status: ' + cl.status);