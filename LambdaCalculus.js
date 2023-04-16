"use strict";
// A Lambda calculus Expression can be
// A Symbol
// A Lambda taking arg and having a body which is an Exp
// An Application (Exp Exp)
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.Lambda = exports.Atom = exports.Symbol = void 0;
var Symbol = /** @class */ (function () {
    function Symbol(val) {
        this.type = "Symbol";
        this.val = val;
    }
    return Symbol;
}());
exports.Symbol = Symbol;
var Atom = /** @class */ (function () {
    function Atom(val) {
        this.type = "Atom";
        this.val = val;
    }
    Atom.prototype.toString = function () {
        return this.val.toString();
    };
    return Atom;
}());
exports.Atom = Atom;
var Lambda = /** @class */ (function () {
    function Lambda(arg, body) {
        this.type = "Lambda";
        this.arg = arg;
        this.body = body;
    }
    Lambda.prototype.toString = function () {
        return "(\u03BB".concat(this.arg.val, ".").concat(this.body.toString(), ")");
    };
    return Lambda;
}());
exports.Lambda = Lambda;
var App = /** @class */ (function () {
    function App(rator, rand) {
        this.type = "App";
        this.rator = rator;
        this.rand = rand;
    }
    App.prototype.toString = function () {
        return "(".concat(this.rator.toString(), " ").concat(this.rand.toString(), ")");
    };
    return App;
}());
exports.App = App;
