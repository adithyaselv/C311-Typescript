"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_ts_1 = require("./LambdaCalculus.ts");
var valof;
valof = function (exp, env) {
    if (exp instanceof LambdaCalculus_ts_1.Atom) {
        return exp;
    }
    else if (exp instanceof LambdaCalculus_ts_1.Symbol) {
        return env(exp);
    }
    else if (exp instanceof LambdaCalculus_ts_1.Lambda) {
        return function (x) {
            return valof(exp.body, function (y) {
                if (y.val === exp.arg.val) {
                    return x;
                }
                else {
                    return env(y);
                }
            });
        };
    }
    else if (exp instanceof LambdaCalculus_ts_1.App) {
        var rator = valof(exp.rator, env);
        var rand = valof(exp.rand, env);
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
console.log("Testing function valof");
var exp1 = new LambdaCalculus_ts_1.App(new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("x")), new LambdaCalculus_ts_1.Atom(5));
var exp2 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("x"));
var env1 = function (x) {
    throw new Error("Unbound variable");
};
console.log(valof(exp1, env1).toString());
var val1 = valof(exp2, env1);
val1 instanceof Function ? console.log(val1(new LambdaCalculus_ts_1.Atom(25)).toString()) : console.log(val1.toString());
