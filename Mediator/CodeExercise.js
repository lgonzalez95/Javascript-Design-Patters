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

    fire(sender, args) {
        this.handlers.forEach(function (v, k) {
            v(sender, args);
        });
    }
}

class Mediator {
    constructor() {
        this.event = new Event();
    }

    broadcast(sender, n) {
        this.event.fire(sender, n);
    }
}

class Participant {
    constructor(mediator) {
        this.value = 0;
        this.mediator = mediator;
        this.mediator.event.subscribe(
            this.alert.bind(this)
        );
    }

    say(n) {
        this.mediator.broadcast(this, n);
        console.log(`The value mentioned is ${n}`);
    }

    alert(sender, n) {
        if (sender !== this)
            this.value += n;
    }
}

let mediator = new Mediator();
let p1 = new Participant(mediator);
let p2 = new Participant(mediator);


p1.say(2);
console.log(p1.value);
console.log(p2.value);