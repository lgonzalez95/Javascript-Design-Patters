/**
 * A pattern in which the object's behavior is 
 * determined by its state. An object transitions from one state to another 
 * (something needs to trigger a transition)
 * 
 * A formalizd construct which manages state and
 * transitions is called state machine
 */

class Switch {
    constructor() {
        this.state = new OffState();
    }

    on() {
        this.state.on(this);
    }

    off() {
        this.state.off(this);
    }
}

class State {
    constructor() {
        if (this.constructor === State)
            throw new Error('abstract!');
    }

    on(sw) {
        console.log('Light is already on.');
    }

    off(sw) {
        console.log('Light is already off.')
    }
}

class OnState extends State {
    constructor() {
        super();
        console.log('Light turned on.')
    }

    off(sw) {
        console.log('Turning light off...');
        sw.state = new OffState();
    }
}

class OffState extends State {
    constructor() {
        super();
        console.log('Light turned off.');
    }

    on(sw) {
        console.log('Turning light on...');
        sw.state = new OnState();
    }
}

let sw = new Switch();
sw.on();
sw.off();
sw.off();