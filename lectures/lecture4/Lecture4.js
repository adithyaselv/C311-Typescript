"use strict";
// Lecture 4 More Lambda calculus
//
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("../../utils/LambdaCalculus");
var ExpEqExp;
ExpEqExp = function (exp1, exp2) {
    // check if number or string
    if (exp1 instanceof LambdaCalculus_1.Atom && exp2 instanceof LambdaCalculus_1.Atom) {
        return exp1 == exp2;
    }
    else if (exp1 instanceof LambdaCalculus_1.Symbol && exp2 instanceof LambdaCalculus_1.Symbol) {
        return exp1.val == exp2.val;
    }
    else if (exp1 instanceof LambdaCalculus_1.Lambda && exp2 instanceof LambdaCalculus_1.Lambda) {
        return exp1.arg.val == exp2.arg.val && ExpEqExp(exp1.body, exp2.body);
    }
    else if (exp1 instanceof LambdaCalculus_1.App && exp2 instanceof LambdaCalculus_1.App) {
        return ExpEqExp(exp1.rator, exp2.rator) && ExpEqExp(exp1.rand, exp2.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function ExpEqExp");
var exp1 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("x"));
var exp2 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("x"));
var exp3 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("y"), new LambdaCalculus_1.Symbol("y"));
console.log(ExpEqExp(exp1, exp2));
console.log(ExpEqExp(exp1, exp3));
var occurs;
occurs = function (sym, exp) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return sym.val === exp.val;
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return occurs(sym, exp.body);
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        return occurs(sym, exp.rator) || occurs(sym, exp.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function occurs");
var sym1 = new LambdaCalculus_1.Symbol("x");
var sym2 = new LambdaCalculus_1.Symbol("y");
var exp4 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("x"));
var exp5 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("y"), new LambdaCalculus_1.Symbol("y"));
var exp6 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("y"));
console.log(occurs(sym1, exp4));
console.log(occurs(sym1, exp5));
console.log(occurs(sym1, exp6));
var occursFree;
occursFree = function (sym, exp) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return sym.val === exp.val;
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return exp.arg.val !== sym.val && occursFree(sym, exp.body);
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        return occursFree(sym, exp.rator) || occursFree(sym, exp.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function occursFree");
var sym3 = new LambdaCalculus_1.Symbol("x");
var sym4 = new LambdaCalculus_1.Symbol("y");
var exp7 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("x"));
var exp8 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("y"), new LambdaCalculus_1.Symbol("y"));
var exp9 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("y"));
console.log(occursFree(sym3, exp7));
console.log(occursFree(sym3, exp8));
console.log(occursFree(sym4, exp9));
var occursBound;
occursBound = function (sym, exp) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_1.Symbol && exp.val == sym.val) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return (exp.arg.val === sym.val && occursFree(sym, exp.body)) || occursBound(sym, exp.body);
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        return occursBound(sym, exp.rator) || occursBound(sym, exp.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function occursBound");
var sym5 = new LambdaCalculus_1.Symbol("x");
var sym6 = new LambdaCalculus_1.Symbol("y");
var exp10 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("x"));
var exp11 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("y"), new LambdaCalculus_1.Symbol("y"));
var exp12 = new LambdaCalculus_1.Lambda(new LambdaCalculus_1.Symbol("x"), new LambdaCalculus_1.Symbol("y"));
console.log(occursBound(sym5, exp10));
console.log(occursBound(sym5, exp11));
console.log(occursBound(sym5, exp12));
console.log(occursBound(sym6, exp12));
