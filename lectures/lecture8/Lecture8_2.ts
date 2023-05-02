// Lecture 8 : More Interpreters 
// Call by need

import {Exp, Atom, Lambda, App, Symbol, Ops, Plus} from "../../utils/LambdaCalculus";
import { Parser } from "../../utils/Parser";

type KV = {key: Symbol , val: Box};
type Env = KV[];


let extendEnv = (x: Box, arg: Symbol, env: Env) => {
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

let printEnv = (env: Env) => {
    let result = "";
    for(let i = 0; i < env.length; i++) {
        result += env[i].key.val + " -> " + env[i].val.toString() + "\n" ;
    }
    return result;
}



type Closure = (x: Box) => Value;

type Value = Atom | Closure;


type BoxContent = () => Value;

class Box {
    val: BoxContent;

    constructor(val: BoxContent) {
        this.val = val;
    }
   
    setbox = (x: Value) => {
        this.val = () => x;
    }

    toString(): string {
        return this.val.toString();
    }
}

let valofCallByNeed: (exp: Exp, env: Env) => Value
valofCallByNeed = (exp, env) => {
    if(exp instanceof Atom) {
        return exp;
    }
    else if(exp instanceof Symbol) {
        //console.log(printEnv(env));
        let result = getValue(exp, env).val()
        getValue(exp, env).setbox(result);
        //console.log(getValue(exp, env).val.toString());
        return result;
    }
    else if(exp instanceof Lambda) {
        return (x: Box) => {
            return valofCallByNeed(exp.body, extendEnv(x, exp.arg, env));
        }   
    }
    else if(exp instanceof Plus) {
        let left = valofCallByNeed(exp.left, env);
        let right = valofCallByNeed(exp.right, env);
        if(left instanceof Atom && right instanceof Atom 
            && typeof left.val === "number" && typeof right.val === "number") {
            return new Atom(left.val + right.val);
        }
        else {
            throw new Error("Invalid input");
        }
    }
    else if(exp instanceof App) {
        let rator = valofCallByNeed(exp.rator, env);
        let rand = new Box(() => {
            // console.log("Hello"); 
            return valofCallByNeed(exp.rand, env)
        });
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

let exp3 = new Parser("((λ(x) (+ x (+ x x))) 10)").parse();
//let exp4 = new Parser("((λ(x)42) ((λ(x)(x x)) (λ(x)(x x))))").parse();

console.log("Testing function valofCallByName");
console.log(valofCallByNeed(exp3, initEnv).toString());
//console.log(valofCallByNeed(exp4, (x: Symbol) => {throw new Error("Unbound variable")}).toString());

