// Lecture 8 : More Interpreters 
// Call by value, Call by reference, Call by name, Call by need

import {Exp, Atom, Lambda, App, Symbol, Ops, Plus} from "./LambdaCalculus";
import { Parser } from "./Parser";

type Env = (y: Symbol) => () => Value

type Closure = (x: () => Value) => Value;

type Value = Atom | Closure;

let valofCallByName: (exp: Exp, env: Env) => Value
valofCallByName = (exp, env) => {
    if(exp instanceof Atom) {
        return exp;
    }
    else if(exp instanceof Symbol) {
        return env(exp)();
    }
    else if(exp instanceof Lambda) {
        return (x: () => Value) => {
            return valofCallByName(exp.body, (y: Symbol) => {
                return y.val === exp.arg.val ? x : env(y);
            });
        }   
    }
    else if(exp instanceof App) {
        let rator = valofCallByName(exp.rator, env);
        let rand = () => valofCallByName(exp.rand, env);
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
console.log(valofCallByName(exp3, (x: Symbol) => {throw new Error("Unbound variable")}).toString());
console.log(valofCallByName(exp4, (x: Symbol) => {throw new Error("Unbound variable")}).toString());

