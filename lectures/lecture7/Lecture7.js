"use strict";
// Lecture 7: RI with respect to closures
// Add more features to the RI interpreter
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("../../utils/LambdaCalculus");
var Parser_1 = require("../../utils/Parser");
var Closure = /** @class */ (function () {
    function Closure(arg, body, env) {
        this.arg = arg;
        this.body = body;
        this.env = env;
    }
    Closure.prototype.toString = function () {
        return "(\u03BB".concat(this.arg.val, ".").concat(this.body.toString(), ") ").concat(this.env.toString());
    };
    return Closure;
}());
var extendEnv = function (x, arg, env) {
    return __spreadArray([{ key: arg, val: x }], env, true);
};
var initEnv = [];
var getValue = function (x, env) {
    for (var i = 0; i < env.length; i++) {
        if (env[i].key.val === x.val) {
            return env[i].val;
        }
    }
    throw new Error("Unbound variable");
};
var createClosure = function (exp, env) {
    return new Closure(exp.arg, exp.body, env);
};
var applyClosure = function (c, rand) { return valofRI(c.body, extendEnv(rand, c.arg, c.env)); };
var valofRI;
valofRI = function (exp, env) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return exp;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return getValue(exp, env);
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return createClosure(exp, env);
    }
    else if (exp instanceof LambdaCalculus_1.Plus) {
        var left = valofRI(exp.left, env);
        var right = valofRI(exp.right, env);
        if (left instanceof LambdaCalculus_1.Atom && right instanceof LambdaCalculus_1.Atom
            && typeof left.val === "number" && typeof right.val === "number") {
            return new LambdaCalculus_1.Atom(left.val + right.val);
        }
        else {
            throw new Error("Invalid input");
        }
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        var rator = valofRI(exp.rator, env);
        var rand = valofRI(exp.rand, env);
        if (rator instanceof Closure) {
            return applyClosure(rator, rand);
        }
        else {
            throw new Error("rator is not a lambda");
        }
    }
    else {
        throw new Error("Invalid input");
    }
};
console.log("Testing function valofRI");
var exp3 = new Parser_1.Parser("((λ(x)x) (+ 5 5))").parse();
var exp4 = new Parser_1.Parser("(λ(x)x)").parse();
console.log(valofRI(exp3, initEnv).toString());
var val2 = valofRI(exp4, initEnv);
console.log(val2.toString());
val2 instanceof Closure ? console.log(applyClosure(val2, new LambdaCalculus_1.Atom(25)).toString()) : console.log(val2.toString());
