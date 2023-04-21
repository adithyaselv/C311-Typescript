"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("./LambdaCalculus");
var Parser_1 = require("./Parser");
var applyEnv = function (env, x, k) {
    return env(x, k);
};
var initEnv = function (x, k) {
    throw new Error("Unbound variable");
};
var extendEnv = function (env, arg, v) {
    return function (y, ek) {
        return y.val === arg.val ? ek(v) : applyEnv(env, y, ek);
    };
};
var randK = function (rator, k) {
    return function (rand) {
        if (rator instanceof Function) {
            return rator(rand, k);
        }
        else {
            throw new Error("rator is not a lambda");
        }
    };
};
var ratorK = function (exp, env, k) {
    return function (rator) {
        return valofcps(exp.rand, env, randK(rator, k));
    };
};
var makeClosure = function (exp, env) {
    return function (x, lk) {
        return valofcps(exp.body, extendEnv(env, exp.arg, x), lk);
    };
};
var applyK;
applyK = function (k, v) {
    return k(v);
};
// CPS interpreter
var valofcps;
valofcps = function (exp, env, k) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return applyK(k, exp);
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return applyEnv(env, exp, k);
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return applyK(k, makeClosure(exp, env));
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        return valofcps(exp.rator, env, ratorK(exp, env, k));
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
console.log("Testing function valofcps");
console.log(valofcps(exp1, initEnv, function (v) { return v; }).toString());
var val2 = valofcps(exp2, initEnv, function (v) { return v; });
val2 instanceof Function ? console.log(val2(new LambdaCalculus_1.Atom(25), function (v) { return v; }).toString()) : console.log(val2.toString());
