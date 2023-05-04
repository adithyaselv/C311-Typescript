// Lecture 7: RI with respect to closures
// Add more features to the RI interpreter

import {Exp, Atom, Lambda, App, Symbol, Ops, Plus} from "../../utils/LambdaCalculus";
import { Parser } from "../../utils/Parser";


class Closure {
    constructor(readonly arg: Symbol, readonly body: Exp, readonly env: Env) {}
    toString(): string {
        return `(λ${this.arg.val}.${this.body.toString()}) ${this.env.toString()}`
    }
}

type Value = Atom | Closure;

type KV = {key: Symbol , val: Value};
export type Env = KV[];

let extendEnv = (x: Value, arg: Symbol, env: Env) => {
    return [{key: arg, val: x}, ...env];
}

let initEnv: KV[] = []

let getValue = (x: Symbol, env: Env) => {
    for(let i = 0; i < env.length; i++) {
        if(env[i].key.val === x.val) {
            return env[i].val;
        }
    }
    throw new Error("Unbound variable");
}

let createClosure = (exp: Lambda, env: Env) => {
    return new Closure(exp.arg, exp.body, env);
}

let applyClosure = (c: Closure, rand: Value) => valofRI(c.body, extendEnv(rand, c.arg, c.env))

let valofRI: (exp: Exp, env: Env) => Value
valofRI = (exp, env) => {
    if(exp instanceof Atom) {
        return exp;
    }
    else if(exp instanceof Symbol) {
        return getValue(exp, env);
    }
    else if(exp instanceof Lambda) {
        return createClosure(exp, env);
    }
    else if(exp instanceof Plus) {
        let left = valofRI(exp.left, env);
        let right = valofRI(exp.right, env);
        if(left instanceof Atom && right instanceof Atom 
            && typeof left.val === "number" && typeof right.val === "number") {
            return new Atom(left.val + right.val);
        }
        else {
            throw new Error("Invalid input");
        }
    }
    else if(exp instanceof App) {
        let rator = valofRI(exp.rator, env);
        let rand = valofRI(exp.rand, env);
        if(rator instanceof Closure) {
            return applyClosure(rator, rand);
        }
        else {
            throw new Error("rator is not a lambda");
        }
    }
    else {
        throw new Error("Invalid input");
    }
}

console.log("Testing function valofRI");
let exp3 = new Parser("((λ(x)x) (+ 5 5))").parse();
let exp4 = new Parser("(λ(x)x)").parse(); 

console.log(valofRI(exp3, initEnv).toString());
let val2 = valofRI(exp4, initEnv);
console.log(val2.toString())
val2 instanceof Closure ? console.log(applyClosure(val2 ,new Atom(25)).toString()) : console.log(val2.toString());

export {valofRI};