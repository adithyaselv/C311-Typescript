"use strict";
// Lecture 8 : More Interpreters 
// Call by need
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("./LambdaCalculus");
var Parser_1 = require("./Parser");
var Box = /** @class */ (function () {
    function Box(val) {
        var _this = this;
        this.val = val;
        this.unbox = this.val;
        this.setbox = function (x) {
            _this.val = function () { return x; };
        };
        this.val = val;
    }
    return Box;
}());
var valofCallByNeed;
valofCallByNeed = function (exp, env) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return exp;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        env(exp).setbox(env(exp).unbox());
        return env(exp).unbox();
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return function (x) {
            return valofCallByNeed(exp.body, function (y) {
                return y.val === exp.arg.val ? x : env(y);
            });
        };
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        var rator = valofCallByNeed(exp.rator, env);
        var rand = new Box(function () { return valofCallByNeed(exp.rand, env); });
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
var exp3 = new Parser_1.Parser("((λx.x) 10)").parse();
var exp4 = new Parser_1.Parser("((λx.42) ((λx.(x x)) (λx.(x x))))").parse();
console.log("Testing function valofCallByName");
console.log(valofCallByNeed(exp3, function (x) { throw new Error("Unbound variable"); }).toString());
console.log(valofCallByNeed(exp4, function (x) { throw new Error("Unbound variable"); }).toString());
