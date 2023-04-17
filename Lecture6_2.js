"use strict";
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
var LambdaCalculus_1 = require("./LambdaCalculus");
var Parser_1 = require("./Parser");
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
var valofRI;
valofRI = function (exp, env) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return exp;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return getValue(exp, env);
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return function (x) {
            return valofRI(exp.body, extendEnv(x, exp.arg, env));
        };
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        var rator = valofRI(exp.rator, env);
        var rand = valofRI(exp.rand, env);
        if (rator instanceof Function) {
            return rator(rand);
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
var exp3 = new Parser_1.Parser("((λx.x) 5)").parse();
var exp4 = new Parser_1.Parser("(λx.x)").parse();
console.log(valofRI(exp3, initEnv).toString());
var val2 = valofRI(exp4, initEnv);
val2 instanceof Function ? console.log(val2(new LambdaCalculus_1.Atom(25)).toString()) : console.log(val2.toString());
