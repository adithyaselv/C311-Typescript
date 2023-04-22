"use strict";
// Lecture 3: Lambda Calculus
// Racket series contains Let, quasiquotes and Lambda calculus
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.Lambda = exports.Atom = exports.Symbol = void 0;
// A Lambda calculus Expression can be
// A Symbol
// A Lambda taking arg and having a body which is an Exp
// An Application (Exp Exp)
class Symbol {
    constructor(val) {
        this.val = val;
    }
}
exports.Symbol = Symbol;
class Atom {
    constructor(val) {
        this.val = val;
    }
}
exports.Atom = Atom;
class Lambda {
    constructor(arg, body) {
        this.arg = arg;
        this.body = body;
    }
}
exports.Lambda = Lambda;
class App {
    constructor(rator, rand) {
        this.rator = rator;
        this.rand = rand;
    }
}
exports.App = App;
