class Creature {
    constructor(attack, health) {
        this.attack = attack;
        this.health = health;
    }
}

class CardGame {
    constructor(creatures) {
        this.creatures = creatures;
    }

    // returns index of winner if there's a winner
    // returns -1 if there's no winner (both alive or both dead)
    combat(creature1index, creature2index) {
        let first = this.creatures[creature1index];
        let second = this.creatures[creature2index];
        this.hit(first, second);
        this.hit(second, first);
        let firstAlive = first.health > 0;
        let secondAlive = second.health > 0;
        if (firstAlive === secondAlive) return -1;
        return firstAlive ? creature1index : creature2index;
    }

    hit(attacker, defender) {
        throw new Error('Please implement this in inheritors');
    }
}

class TemporaryCardDamageGame extends CardGame {
    constructor(creatures) {
        super(creatures);
    }

    hit(attacker, defender) {
        // todo
        if (defender.health <= attacker.attack)
            defender.health -= attacker.attack;
    }
}

class PermanentCardDamageGame extends CardGame {
    constructor(creatures) {
        super(creatures);
    }

    hit(attacker, defender) {
        // todo
        defender.health -= attacker.attack;
    }
}


console.log();
console.log('-----------------');
let c1 = new Creature(1, 2);
let c2 = new Creature(1, 2);
let game = new TemporaryCardDamageGame([c1, c2]);
console.log(game.combat(0, 1) + ' should be -1');
console.log(game.combat(0, 1) + ' should be -1');
console.log('-----------------');
console.log();

console.log('-----------------');
let c11 = new Creature(1, 1);
let c21 = new Creature(2, 2);
let game1 = new TemporaryCardDamageGame([c11, c21]);
console.log(game1.combat(0, 1) + ' should be 1');
console.log('-----------------');

console.log();
console.log('-----------------');
let c12 = new Creature(2, 2);
let c22 = new Creature(2, 2);
let game2 = new TemporaryCardDamageGame([c12, c22]);
console.log(game2.combat(0, 1) + ' should be -1');
console.log('-----------------');

console.log();
console.log('-----------------');
let c13 = new Creature(1, 2);
let c23 = new Creature(1, 3);
let game3 = new PermanentCardDamageGame([c13, c23]);
console.log(game3.combat(0, 1) + ' should be -1');
console.log(game3.combat(0, 1) + ' should be 1');
console.log('-----------------');