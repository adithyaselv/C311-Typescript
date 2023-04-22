// A Lambda calculus Expression can be
// A Symbol
// A Lambda taking arg and having a body which is an Exp
// An Application (Exp Exp)

export interface Exp {
    type: string;
}

export class Symbol implements Exp {
    type: string = "Symbol";

    constructor(readonly val: string) {}

    toString(): string {
        return this.val.toString()
    }    
}

export class Atom implements Exp {
    type: string = "Atom";

    constructor(readonly val: number | string) {}
    
    toString(): string {
        return this.val.toString()
    }
}

export class Lambda implements Exp {
    type: string = "Lambda";

    constructor(readonly arg: Symbol, readonly body: Exp) {}

    toString(): string {
        return `(λ${this.arg.val}.${this.body.toString()})`
    }
}

export class App implements Exp {
    type: string = "App";

    constructor(readonly rator: Exp, readonly rand: Exp) {}

    toString(): string {
        return `(${this.rator.toString()} ${this.rand.toString()})`
    }
}

export type Closure = (x: Value) => Value;

export type Value = Atom | Closure;

export type Env = (y: Symbol) => Value;

export interface Ops {
    name: String;
}

export class Plus implements Exp, Ops {
    type: string = "Ops"
    name: string = "Plus";

    constructor(readonly left: Exp, readonly right: Exp) {}

    toString(): string {
        return `(+ ${this.left.toString()}  ${this.right.toString()})`
    }
}

export class Add1 implements Exp, Ops {
    type: string = "Ops"
    name: string = "Add1";

    constructor(readonly exp: Exp) {}

    toString(): string {
        return `(add1 ${this.exp.toString()}})`
    }
}

export class Sub1 implements Exp, Ops {
    type: string = "Ops"
    name: string = "Sub1";

    constructor(readonly exp: Exp) {}

    toString(): string {
        return `(sub1 ${this.exp.toString()}})`
    }
}