"use strict";
// Lecture 8 : More Interpreters 
// Call by need
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
var printEnv = function (env) {
    var result = "";
    for (var i = 0; i < env.length; i++) {
        result += env[i].key.val + " -> " + env[i].val.toString() + "\n";
    }
    return result;
};
var Box = /** @class */ (function () {
    function Box(val) {
        var _this = this;
        this.setbox = function (x) {
            _this.val = function () { return x; };
        };
        this.val = val;
    }
    Box.prototype.toString = function () {
        return this.val.toString();
    };
    return Box;
}());
var valofCallByNeed;
valofCallByNeed = function (exp, env) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return exp;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        //console.log(printEnv(env));
        var result = getValue(exp, env).val();
        getValue(exp, env).setbox(result);
        //console.log(getValue(exp, env).val.toString());
        return result;
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return function (x) {
            return valofCallByNeed(exp.body, extendEnv(x, exp.arg, env));
        };
    }
    else if (exp instanceof LambdaCalculus_1.Plus) {
        var left = valofCallByNeed(exp.left, env);
        var right = valofCallByNeed(exp.right, env);
        if (left instanceof LambdaCalculus_1.Atom && right instanceof LambdaCalculus_1.Atom
            && typeof left.val === "number" && typeof right.val === "number") {
            return new LambdaCalculus_1.Atom(left.val + right.val);
        }
        else {
            throw new Error("Invalid input");
        }
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        var rator = valofCallByNeed(exp.rator, env);
        var rand = new Box(function () {
            // console.log("Hello"); 
            return valofCallByNeed(exp.rand, env);
        });
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
var exp3 = new Parser_1.Parser("((λx. (+ x (+ x x))) 10)").parse();
//let exp4 = new Parser("((λx.42) ((λx.(x x)) (λx.(x x))))").parse();
console.log("Testing function valofCallByName");
console.log(valofCallByNeed(exp3, initEnv).toString());
//console.log(valofCallByNeed(exp4, (x: Symbol) => {throw new Error("Unbound variable")}).toString());
