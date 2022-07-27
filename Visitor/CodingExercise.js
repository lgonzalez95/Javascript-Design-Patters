class Integer {
    constructor(value) {
        this.value = value;
    }

    accept(visitor) {
        visitor.visitValue(this);
    }
}

class BinaryExpression {
    constructor(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
}

class AdditionExpression extends BinaryExpression {
    constructor(lhs, rhs) {
        super(lhs, rhs);
    }

    accept(visitor) {
        visitor.visitAddition(this);
    }
}

class MultiplicationExpression extends BinaryExpression {
    constructor(lhs, rhs) {
        super(lhs, rhs);
    }

    accept(visitor) {
        visitor.visitAddition(this);
    }
}

class ExpressionPrinter {
    constructor() {
        // todo
        this.buffer = [];
    }

    visitValue(value) {
        // todo
        this.buffer.push(value.value);
    }

    visitAddition(ae) {
        // todo
        this.buffer.push('(');
        ae.lhs.accept(this);
        this.buffer.push('+');
        ae.rhs.accept(this);
        this.buffer.push(')');
    }

    visitMultiplication(me) {
        // todo
        me.lhs.accept(this);
        this.buffer.push('*');
        me.rhs.accept(this);
    }

    toString() {
        // todo
        return this.buffer.join('');
    }
}


let simple = new AdditionExpression(
    new Integer(2), new Integer(3)
);
let ep = new ExpressionPrinter();
ep.visitAddition(simple);
console.log(ep.toString() + ' should be ' + '(2+3)');



const expr2 = new MultiplicationExpression(
    new AdditionExpression(new Integer(2), new Integer(3)),
    new Integer(4)
);
let ep2 = new ExpressionPrinter();
ep2.visitMultiplication(expr2);
console.log(ep2.toString() + ' should be ' + '(2+3)*4');