// Lecture 4 More Lambda calculus
//

import {Exp, Atom, Lambda, App, Symbol} from "./LambdaCalculus.ts";

let ExpEqExp: (exp1: Exp, exp2: Exp) => boolean
ExpEqExp = (exp1, exp2) => {
    // check if number or string
    if(exp1 instanceof Atom && exp2 instanceof Atom) {
        return exp1 == exp2;
    }
    else if(exp1 instanceof Symbol && exp2 instanceof Symbol) {
        return exp1.val == exp2.val;
    }
    else if(exp1 instanceof Lambda && exp2 instanceof Lambda) {
        return exp1.arg.val == exp2.arg.val && ExpEqExp(exp1.body, exp2.body);
    }
    else if(exp1 instanceof App && exp2 instanceof App) {
        return ExpEqExp(exp1.rator, exp2.rator) && ExpEqExp(exp1.rand, exp2.rand);
    }
    else {
        return false;
    }
}

console.log("Testing function ExpEqExp");
let exp1 = new Lambda(new Symbol("x"), new Symbol("x"));
let exp2 = new Lambda(new Symbol("x"), new Symbol("x"));
let exp3 = new Lambda(new Symbol("y"), new Symbol("y"));

console.log(ExpEqExp(exp1, exp2));
console.log(ExpEqExp(exp1, exp3));

let occurs: (sym: Symbol, exp: Exp) => boolean
occurs = (sym, exp) => {
    if(exp instanceof Atom) {
        return false;
    }
    else if(exp instanceof Symbol) {
        return sym.val === exp.val;
    }
    else if(exp instanceof Lambda) {
        return occurs(sym, exp.body);
    }
    else if(exp instanceof App) {
        return occurs(sym, exp.rator) || occurs(sym, exp.rand);
    }
    else {
        return false;
    }
}

console.log("Testing function occurs");
let sym1 = new Symbol("x");
let sym2 = new Symbol("y");
let exp4 = new Lambda(new Symbol("x"), new Symbol("x"));
let exp5 = new Lambda(new Symbol("y"), new Symbol("y"));
let exp6 = new Lambda(new Symbol("x"), new Symbol("y"));

console.log(occurs(sym1, exp4));
console.log(occurs(sym1, exp5));
console.log(occurs(sym1, exp6));

let occursFree: (sym: Symbol, exp: Exp) => boolean
occursFree = (sym, exp) => {
    if(exp instanceof Atom) {
        return false;
    }
    else if(exp instanceof Symbol) {
        return sym.val === exp.val;
    }
    else if(exp instanceof Lambda) {
        return exp.arg.val !== sym.val && occursFree(sym, exp.body);
    }
    else if(exp instanceof App) {
        return occursFree(sym, exp.rator) || occursFree(sym, exp.rand);
    }
    else {
        return false;
    }
}

console.log("Testing function occursFree");
let sym3 = new Symbol("x");
let sym4 = new Symbol("y");
let exp7 = new Lambda(new Symbol("x"), new Symbol("x"));
let exp8 = new Lambda(new Symbol("y"), new Symbol("y"));
let exp9 = new Lambda(new Symbol("x"), new Symbol("y"));

console.log(occursFree(sym3, exp7));
console.log(occursFree(sym3, exp8));
console.log(occursFree(sym4, exp9));

let occursBound: (sym: Symbol, exp: Exp) => boolean
occursBound = (sym, exp) => {
    if(exp instanceof Atom) {
        return false;
    }
    else if(exp instanceof Symbol && exp.val == sym.val) {
        return false;
    }
    else if(exp instanceof Lambda) {
        return (exp.arg.val === sym.val && occursFree(sym, exp.body)) || occursBound(sym, exp.body);
    }
    else if(exp instanceof App) {
        return occursBound(sym, exp.rator) || occursBound(sym, exp.rand);
    }
    else {
        return false;
    }
}

console.log("Testing function occursBound");
let sym5 = new Symbol("x");
let sym6 = new Symbol("y");
let exp10 = new Lambda(new Symbol("x"), new Symbol("x"));
let exp11 = new Lambda(new Symbol("y"), new Symbol("y"));
let exp12 = new Lambda(new Symbol("x"), new Symbol("y"));

console.log(occursBound(sym5, exp10));
console.log(occursBound(sym5, exp11));
console.log(occursBound(sym5, exp12));
console.log(occursBound(sym6, exp12));