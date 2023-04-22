// Lecture 3: Lambda Calculus
// Racket series contains Let, quasiquotes and Lambda calculus

// A Lambda calculus Expression can be
// A Symbol
// A Lambda taking arg and having a body which is an Exp
// An Application (Exp Exp)

export class Symbol {
    val: string
    constructor(val: string) {
        this.val = val
    }
}

export class Atom {
    val: number | string
    constructor(val: number | string) {
        this.val = val
    }
}

export class Lambda {
    arg: Symbol
    body: Exp
    constructor(arg: Symbol, body: Exp) {
        this.arg = arg
        this.body = body
    }
}

export class App {
    rator: Exp
    rand: Exp
    constructor(rator: Exp, rand: Exp) {
        this.rator = rator
        this.rand = rand
    }
}

export type Exp = Atom | Symbol | Lambda | App



