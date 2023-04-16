"use strict";
// Lecture 4 More Lambda calculus
//
Object.defineProperty(exports, "__esModule", { value: true });
const LambdaCalculus_ts_1 = require("./LambdaCalculus.ts");
let ExpEqExp;
ExpEqExp = (exp1, exp2) => {
    // check if number or string
    if (exp1 instanceof LambdaCalculus_ts_1.Atom && exp2 instanceof LambdaCalculus_ts_1.Atom) {
        return exp1 == exp2;
    }
    else if (exp1 instanceof LambdaCalculus_ts_1.Symbol && exp2 instanceof LambdaCalculus_ts_1.Symbol) {
        return exp1.val == exp2.val;
    }
    else if (exp1 instanceof LambdaCalculus_ts_1.Lambda && exp2 instanceof LambdaCalculus_ts_1.Lambda) {
        return exp1.arg.val == exp2.arg.val && ExpEqExp(exp1.body, exp2.body);
    }
    else if (exp1 instanceof LambdaCalculus_ts_1.App && exp2 instanceof LambdaCalculus_ts_1.App) {
        return ExpEqExp(exp1.rator, exp2.rator) && ExpEqExp(exp1.rand, exp2.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function ExpEqExp");
let exp1 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("x"));
let exp2 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("x"));
let exp3 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("y"), new LambdaCalculus_ts_1.Symbol("y"));
console.log(ExpEqExp(exp1, exp2));
console.log(ExpEqExp(exp1, exp3));
let occurs;
occurs = (sym, exp) => {
    if (exp instanceof LambdaCalculus_ts_1.Atom) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_ts_1.Symbol) {
        return sym.val === exp.val;
    }
    else if (exp instanceof LambdaCalculus_ts_1.Lambda) {
        return occurs(sym, exp.body);
    }
    else if (exp instanceof LambdaCalculus_ts_1.App) {
        return occurs(sym, exp.rator) || occurs(sym, exp.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function occurs");
let sym1 = new LambdaCalculus_ts_1.Symbol("x");
let sym2 = new LambdaCalculus_ts_1.Symbol("y");
let exp4 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("x"));
let exp5 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("y"), new LambdaCalculus_ts_1.Symbol("y"));
let exp6 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("y"));
console.log(occurs(sym1, exp4));
console.log(occurs(sym1, exp5));
console.log(occurs(sym1, exp6));
let occursFree;
occursFree = (sym, exp) => {
    if (exp instanceof LambdaCalculus_ts_1.Atom) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_ts_1.Symbol) {
        return sym.val === exp.val;
    }
    else if (exp instanceof LambdaCalculus_ts_1.Lambda) {
        return exp.arg.val !== sym.val && occursFree(sym, exp.body);
    }
    else if (exp instanceof LambdaCalculus_ts_1.App) {
        return occursFree(sym, exp.rator) || occursFree(sym, exp.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function occursFree");
let sym3 = new LambdaCalculus_ts_1.Symbol("x");
let sym4 = new LambdaCalculus_ts_1.Symbol("y");
let exp7 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("x"));
let exp8 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("y"), new LambdaCalculus_ts_1.Symbol("y"));
let exp9 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("y"));
console.log(occursFree(sym3, exp7));
console.log(occursFree(sym3, exp8));
console.log(occursFree(sym4, exp9));
let occursBound;
occursBound = (sym, exp) => {
    if (exp instanceof LambdaCalculus_ts_1.Atom) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_ts_1.Symbol && exp.val == sym.val) {
        return false;
    }
    else if (exp instanceof LambdaCalculus_ts_1.Lambda) {
        return (exp.arg.val === sym.val && occursFree(sym, exp.body)) || occursBound(sym, exp.body);
    }
    else if (exp instanceof LambdaCalculus_ts_1.App) {
        return occursBound(sym, exp.rator) || occursBound(sym, exp.rand);
    }
    else {
        return false;
    }
};
console.log("Testing function occursBound");
let sym5 = new LambdaCalculus_ts_1.Symbol("x");
let sym6 = new LambdaCalculus_ts_1.Symbol("y");
let exp10 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("x"));
let exp11 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("y"), new LambdaCalculus_ts_1.Symbol("y"));
let exp12 = new LambdaCalculus_ts_1.Lambda(new LambdaCalculus_ts_1.Symbol("x"), new LambdaCalculus_ts_1.Symbol("y"));
console.log(occursBound(sym5, exp10));
console.log(occursBound(sym5, exp11));
console.log(occursBound(sym5, exp12));
console.log(occursBound(sym6, exp12));
