// Lecture 10: Eta reduction and more CPS

import {Exp, Atom, Lambda, App, Symbol, Value} from "../../utils/LambdaCalculus";
import { Parser } from "../../utils/Parser";

let remove8: (ls: number[]) => number[];
remove8 = function (ls: number[]): number[] {
    if (ls.length === 0) {
        return [];
    } else if (ls[0] === 8) {
        return remove8(ls.slice(1));
    } else {
        return [ls[0]].concat(remove8(ls.slice(1)));
    }
}

console.log(remove8([1, 2, 3, 8, 4, 5, 8, 6, 7,]));


// Continuation
type Cont<A>= (v: A) => A 

let remove8cps: (ls: number[], k: Cont<number[]>) => number[]
remove8cps = function (ls: number[], k: Cont<number[]>): number[] {
    if (ls.length === 0) {
        return k([]);
    } else if (ls[0] === 8) {
        // return remove8cps(ls.slice(1), (xs: number[]) => k(xs));
        return remove8cps(ls.slice(1), k); // eta reduction
    } else {
        return remove8cps(ls.slice(1), (xs: number[]) => k([ls[0]].concat(xs)));
    }
}


console.log(remove8cps([1, 2, 3, 8, 4, 5, 8, 6, 7,], (xs: number[]) => xs));

// interpreter from Lecture 5

let valof: (exp: Exp, env: (x: Symbol) => Value) => Value
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
let exp1 = new Parser("((λ(x)x) 5)").parse();
let exp2 = new Parser("(λ(x)x)").parse(); 

console.log(valof(exp1, (x: Symbol) => {throw new Error("Unbound variable")}).toString());
let val1 = valof(exp2, (x: Symbol) => {throw new Error("Unbound variable")});
val1 instanceof Function ? console.log(val1(new Atom(25)).toString()) : console.log(val1.toString());




export type ClosureK = (x: ValueK, k: Cont<ValueK>) => ValueK;

export type ValueK = Atom | ClosureK;

// CPS interpreter

let valofcps: (exp: Exp, env: (x: Symbol, ek:Cont<ValueK>) => ValueK, k: Cont<ValueK>) => ValueK
valofcps = (exp, env, k) => {
    if(exp instanceof Atom) {
        return k(exp);
    }
    else if(exp instanceof Symbol) {
        return env(exp, k);
    }
    else if(exp instanceof Lambda) {
        return k((x: ValueK, lk: Cont<ValueK>) => {
            return valofcps(exp.body, (y: Symbol, ek:Cont<ValueK>) => {
                return y.val === exp.arg.val ? ek(x) : env(y, ek);
            }, lk);
        });
    }
    else if(exp instanceof App) {
        return valofcps(exp.rator, env, (rator: ValueK) => {
            return valofcps(exp.rand, env, (rand: ValueK) => {
                if(rator instanceof Function) {
                    return rator(rand, k);
                }
                else {
                    throw new Error("rator is not a lambda");
                }
            });
        });
    }
    else {
        throw new Error("Invalid input");
    }
}

console.log("Testing function valofcps");
console.log(valofcps(exp1, (x: Symbol, ek:Cont<ValueK>) => {throw new Error("Unbound variable")}, (v: ValueK) => v).toString());
let val2 = valofcps(exp2, (x: Symbol, ek:Cont<ValueK>) => {throw new Error("Unbound variable")}, (v: ValueK) => v);
val2 instanceof Function ? console.log(val2(new Atom(25), (v: ValueK) => v).toString()) : console.log(val2.toString());