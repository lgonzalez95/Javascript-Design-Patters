class Creature {
    constructor(attack, health) {
        this.attack = attack;
        this.health = health;
        this.alive = this.health > 0;
        this.id = Creature.count++;
    }
}
Creature.count = 0;

class Game {
    constructor(damageStrategy) {
        this.damageStrategy = damageStrategy;
    }

    springTrapOn(creature) {
        this.damageStrategy.damage(creature);
        return creature.alive;
    }
}

class DamageStrategy {
    damage(creature) {
        if (creature.health <= 0) {
            creature.alive = false;
        }
    }
}

class ConstantDamageStrategy extends DamageStrategy {
    damage(creature) {
        // todo
        creature.health--;
        super.damage(creature);
    }
}

class GrowingDamageStrategy extends DamageStrategy {
    damage(creature) {
        if(GrowingDamageStrategy.impact[creature.id]){
            GrowingDamageStrategy.impact[creature.id]++;
        }else{
            GrowingDamageStrategy.impact[creature.id] = 1;
        }
        
        creature.health -= GrowingDamageStrategy.impact[creature.id];
        super.damage(creature);
    }
}
GrowingDamageStrategy.impact = {};

console.log('two creatures are used here...');
let cg = new Game(new GrowingDamageStrategy());
let c1 = new Creature(1, 3);
let c2 = new Creature(1, 3);

console.log('springing a trap on both creatures');
console.log('expecting each creature to be damaged by 1');
cg.springTrapOn(c1);
cg.springTrapOn(c2);

console.log(c1.health + ' should be ' + 2);
console.log(c1.alive + ' should be true');
console.log(c2.health + ' should be ' + 2);
console.log(c2.alive + ' should be true');

cg.springTrapOn(c2);
console.log(c2.health + ' should be ' + 0);
console.log(c2.alive + ' should be false');