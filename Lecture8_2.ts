// Lecture 8 : More Interpreters 
// Call by need

import {Exp, Atom, Lambda, App, Symbol, Ops, Plus} from "./LambdaCalculus";
import { Parser } from "./Parser";

type Env = (y: Symbol) => Box;

type Closure = (x: Box) => Value;

type Value = Atom | Closure;

class Box {
    constructor(private val:(() => Value)) {
        this.val = val;
    }
    unbox: () => Value = this.val;
    setbox = (x: Value) => {
        this.val = () => x;
    }
}

let valofCallByNeed: (exp: Exp, env: Env) => Value
valofCallByNeed = (exp, env) => {
    if(exp instanceof Atom) {
        return exp;
    }
    else if(exp instanceof Symbol) {
        env(exp).setbox(env(exp).unbox());
        return env(exp).unbox();
    }
    else if(exp instanceof Lambda) {
        return (x: Box) => {
            return valofCallByNeed(exp.body, (y: Symbol) => {
                return y.val === exp.arg.val ? x : env(y);
            });
        }   
    }
    else if(exp instanceof App) {
        let rator = valofCallByNeed(exp.rator, env);
        let rand = new Box(() => valofCallByNeed(exp.rand, env));
        if(rator instanceof Function) {
            return rator(rand);
        }
        else {
            throw new Error("rator is not a lambda");
        }
    }
    else {
        throw new Error("Invalid input");
    }
}

let exp3 = new Parser("((λx.x) 10)").parse();
let exp4 = new Parser("((λx.42) ((λx.(x x)) (λx.(x x))))").parse();

console.log("Testing function valofCallByName");
console.log(valofCallByNeed(exp3, (x: Symbol) => {throw new Error("Unbound variable")}).toString());
console.log(valofCallByNeed(exp4, (x: Symbol) => {throw new Error("Unbound variable")}).toString());

