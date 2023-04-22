"use strict";
// A Lambda calculus Expression can be
// A Symbol
// A Lambda taking arg and having a body which is an Exp
// An Application (Exp Exp)
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sub1 = exports.Add1 = exports.Plus = exports.App = exports.Lambda = exports.Atom = exports.Symbol = void 0;
var Symbol = /** @class */ (function () {
    function Symbol(val) {
        this.val = val;
        this.type = "Symbol";
    }
    Symbol.prototype.toString = function () {
        return this.val.toString();
    };
    return Symbol;
}());
exports.Symbol = Symbol;
var Atom = /** @class */ (function () {
    function Atom(val) {
        this.val = val;
        this.type = "Atom";
    }
    Atom.prototype.toString = function () {
        return this.val.toString();
    };
    return Atom;
}());
exports.Atom = Atom;
var Lambda = /** @class */ (function () {
    function Lambda(arg, body) {
        this.arg = arg;
        this.body = body;
        this.type = "Lambda";
    }
    Lambda.prototype.toString = function () {
        return "(\u03BB".concat(this.arg.val, ".").concat(this.body.toString(), ")");
    };
    return Lambda;
}());
exports.Lambda = Lambda;
var App = /** @class */ (function () {
    function App(rator, rand) {
        this.rator = rator;
        this.rand = rand;
        this.type = "App";
    }
    App.prototype.toString = function () {
        return "(".concat(this.rator.toString(), " ").concat(this.rand.toString(), ")");
    };
    return App;
}());
exports.App = App;
var Plus = /** @class */ (function () {
    function Plus(left, right) {
        this.left = left;
        this.right = right;
        this.type = "Ops";
        this.name = "Plus";
    }
    Plus.prototype.toString = function () {
        return "(+ ".concat(this.left.toString(), "  ").concat(this.right.toString(), ")");
    };
    return Plus;
}());
exports.Plus = Plus;
var Add1 = /** @class */ (function () {
    function Add1(exp) {
        this.exp = exp;
        this.type = "Ops";
        this.name = "Add1";
    }
    Add1.prototype.toString = function () {
        return "(add1 ".concat(this.exp.toString(), "})");
    };
    return Add1;
}());
exports.Add1 = Add1;
var Sub1 = /** @class */ (function () {
    function Sub1(exp) {
        this.exp = exp;
        this.type = "Ops";
        this.name = "Sub1";
    }
    Sub1.prototype.toString = function () {
        return "(sub1 ".concat(this.exp.toString(), "})");
    };
    return Sub1;
}());
exports.Sub1 = Sub1;
