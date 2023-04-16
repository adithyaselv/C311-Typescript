
import {Exp, Atom, Lambda, App, Symbol, Env, Value} from "./LambdaCalculus.ts";

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
                if(y.val === exp.arg.val) {
                    return x;
                }
                else {
                    return env(y);
                } 
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
let exp1 = new App(new Lambda(new Symbol("x"), new Symbol("x")), new Atom(5));
let exp2 = new Lambda(new Symbol("x"), new Symbol("x"));

let env1: Env = (x: Symbol) => {
    throw new Error("Unbound variable");
}

console.log(valof(exp1, env1).toString());
let val1 = valof(exp2, env1);
val1 instanceof Function ? console.log(val1(new Atom(25)).toString()) : console.log(val1.toString());
