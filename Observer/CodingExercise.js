class Event {
    constructor() {
        this.handlers = new Map();
        this.count = 0;
    }

    subscribe(handler) {
        this.handlers.set(++this.count, handler);
        return this.count;
    }

    unsubscribe(idx) {
        this.handlers.delete(idx);
    }

    // 1) who fired the event?
    // 2) additional data (event args)
    fire(sender, args) {
        this.handlers.forEach(
            (v, k) => v(sender, args)
        );
    }
}


class Game {
    // todo
    constructor() {
        this.ratEnters = new Event();
        this.ratDies = new Event();
        this.notifyRat = new Event();
    }

    // the sender is the rat that enters
    fireRatEnters(sender) {
        this.ratEnters.fire(sender, null);
    }

    // the sender is the rat that dies
    fireRatDies(sender) {
        this.ratDies.fire(sender, null);
    }

    fireNotifyRat(sender, whichRat) {
        this.notifyRat.fire(sender, whichRat)
    }
}

class Rat {
    constructor(game) {
        this.game = game;
        this.attack = 1;

        this.game.ratEnters.subscribe(
            this.handleRatEnters.bind(this)
        );

        this.game.ratDies.subscribe(
            this.handleRatDies.bind(this)
        );

        this.game.notifyRat.subscribe(
            this.handleNotifyRat.bind(this)
        );

        game.fireRatEnters(this);
    }

    handleRatEnters(sender, args) {
        if (sender !== this) {
            this.attack++;
            this.game.fireNotifyRat(this, sender);
        }
    }

    handleRatDies(sender, args) {
        this.attack--;
        this.game.fireNotifyRat(this, sender);
    }

    handleNotifyRat(sender, whichRat) {
        if (whichRat === this)
            this.attack++;
    }

    die() {
        // todo
        this.game.fireRatDies(this);
    }
}

let game = new Game();
let rat = new Rat(game);
let rat2 = new Rat(game);
let rat3 = new Rat(game);

rat3.die();
console.log(rat2.attack);