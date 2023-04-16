// A Lambda calculus Expression can be
// A Symbol
// A Lambda taking arg and having a body which is an Exp
// An Application (Exp Exp)

export interface Exp {
    type: string;
}

export class Symbol implements Exp {
    type: string = "Symbol";

    val: string
    constructor(val: string) {
        this.val = val
    }
}

export class Atom implements Exp {
    type: string = "Atom";

    val: number | string
    constructor(val: number | string) {
        this.val = val
    }
    
    toString(): string {
        return this.val.toString()
    }
}

export class Lambda implements Exp {
    type: string = "Lambda";

    arg: Symbol
    body: Exp
    constructor(arg: Symbol, body: Exp) {
        this.arg = arg
        this.body = body
    }

    toString(): string {
        return `(λ${this.arg.val}.${this.body.toString()})`
    }
}

export class App implements Exp {
    type: string = "App";
    rator: Exp
    rand: Exp
    constructor(rator: Exp, rand: Exp) {
        this.rator = rator
        this.rand = rand
    }

    toString(): string {
        return `(${this.rator.toString()} ${this.rand.toString()})`
    }
}

export type Closure = (x: Value) => Value

export type Value = Atom | Closure;

export type Env = (y: Symbol) => Value

