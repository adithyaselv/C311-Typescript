"use strict";
// Lecture 8 : More Interpreters 
// Call by value, Call by reference, Call by name, Call by need
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("../../utils/LambdaCalculus");
var Parser_1 = require("../../utils/Parser");
var valofCallByName;
valofCallByName = function (exp, env) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return exp;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return env(exp)();
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return function (x) {
            return valofCallByName(exp.body, function (y) {
                return y.val === exp.arg.val ? x : env(y);
            });
        };
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        var rator = valofCallByName(exp.rator, env);
        var rand = function () { return valofCallByName(exp.rand, env); };
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
var exp3 = new Parser_1.Parser("((λ(x)x) 10)").parse();
var exp4 = new Parser_1.Parser("((λ(x)42) ((λ(x)(x x)) (λ(x)(x x))))").parse();
console.log("Testing function valofCallByName");
console.log(valofCallByName(exp3, function (x) { throw new Error("Unbound variable"); }).toString());
console.log(valofCallByName(exp4, function (x) { throw new Error("Unbound variable"); }).toString());
