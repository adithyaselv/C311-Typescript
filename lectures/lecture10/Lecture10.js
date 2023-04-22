"use strict";
// Lecture 10: Eta reduction and more CPS
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("../../utils/LambdaCalculus");
var Parser_1 = require("../../utils/Parser");
var remove8;
remove8 = function (ls) {
    if (ls.length === 0) {
        return [];
    }
    else if (ls[0] === 8) {
        return remove8(ls.slice(1));
    }
    else {
        return [ls[0]].concat(remove8(ls.slice(1)));
    }
};
console.log(remove8([1, 2, 3, 8, 4, 5, 8, 6, 7,]));
var remove8cps;
remove8cps = function (ls, k) {
    if (ls.length === 0) {
        return k([]);
    }
    else if (ls[0] === 8) {
        // return remove8cps(ls.slice(1), (xs: number[]) => k(xs));
        return remove8cps(ls.slice(1), k); // eta reduction
    }
    else {
        return remove8cps(ls.slice(1), function (xs) { return k([ls[0]].concat(xs)); });
    }
};
console.log(remove8cps([1, 2, 3, 8, 4, 5, 8, 6, 7,], function (xs) { return xs; }));
// interpreter from Lecture 5
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
// CPS interpreter
var valofcps;
valofcps = function (exp, env, k) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return k(exp);
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return env(exp, k);
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return k(function (x, lk) {
            return valofcps(exp.body, function (y, ek) {
                return y.val === exp.arg.val ? ek(x) : env(y, ek);
            }, lk);
        });
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        return valofcps(exp.rator, env, function (rator) {
            return valofcps(exp.rand, env, function (rand) {
                if (rator instanceof Function) {
                    return rator(rand, k);
                }
                else {
                    throw new Error("rator is not a lambda");
                }
            });
        });
    }
    else {
        throw new Error("Invalid input");
    }
};
console.log("Testing function valofcps");
console.log(valofcps(exp1, function (x, ek) { throw new Error("Unbound variable"); }, function (v) { return v; }).toString());
var val2 = valofcps(exp2, function (x, ek) { throw new Error("Unbound variable"); }, function (v) { return v; });
val2 instanceof Function ? console.log(val2(new LambdaCalculus_1.Atom(25), function (v) { return v; }).toString()) : console.log(val2.toString());
