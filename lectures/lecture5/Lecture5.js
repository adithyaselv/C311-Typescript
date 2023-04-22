"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("../../utils/LambdaCalculus");
var Parser_1 = require("../../utils/Parser");
var valof;
valof = function (exp, env) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return exp;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return env(exp);
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return function (x) {
            return valof(exp.body, function (y) {
                return y.val === exp.arg.val ? x : env(y);
            });
        };
    }
    else if (exp instanceof LambdaCalculus_1.App) {
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
// let exp1 = new App(new Lambda(new Symbol("x"), new Symbol("x")), new Atom(5));
// let exp2 = new Lambda(new Symbol("x"), new Symbol("x"));
var exp1 = new Parser_1.Parser("((λx.x) 5)").parse();
var exp2 = new Parser_1.Parser("(λx.x)").parse();
console.log(valof(exp1, function (x) { throw new Error("Unbound variable"); }).toString());
var val1 = valof(exp2, function (x) { throw new Error("Unbound variable"); });
val1 instanceof Function ? console.log(val1(new LambdaCalculus_1.Atom(25)).toString()) : console.log(val1.toString());
