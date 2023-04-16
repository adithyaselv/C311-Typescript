
import {Exp, Atom, Lambda, App, Symbol, Env, Value} from "./LambdaCalculus.ts";
import { Parser } from "./Parser.ts";

let valof: (exp: Exp, env: Env) => Value
valof = (exp, env) => {
    if(exp instanceof Atom) {
        return exp;
    }
    else if(exp instanceof Symbol) {
        return env(exp);
    }
    else if(exp instanceof Lambda) {
        return (x: Value) => {
            return valof(exp.body, (y: Symbol) => {
                return y.val === exp.arg.val ? x : env(y);
            });
        }   
    }
    else if(exp instanceof App) {
        let rator = valof(exp.rator, env);
        let rand = valof(exp.rand, env);
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

console.log("Testing function valof");
// let exp1 = new App(new Lambda(new Symbol("x"), new Symbol("x")), new Atom(5));
// let exp2 = new Lambda(new Symbol("x"), new Symbol("x"));
let exp1 = new Parser("((λx.x) 5)").parse();
let exp2 = new Parser("(λx.x)").parse();


let env1: Env = (x: Symbol) => {
    throw new Error("Unbound variable");
}

console.log(valof(exp1, env1).toString());
let val1 = valof(exp2, env1);
val1 instanceof Function ? console.log(val1(new Atom(25)).toString()) : console.log(val1.toString());
