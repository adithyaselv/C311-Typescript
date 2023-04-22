
import {Exp, Atom, Lambda, App, Symbol, Value, Closure} from "../../utils/LambdaCalculus";
import { Parser } from "../../utils/Parser";

type KV = {key: Symbol , val: Value};
type Env = KV[];

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


let valofRI: (exp: Exp, env: Env) => Value
valofRI = (exp, env) => {
    if(exp instanceof Atom) {
        return exp;
    }
    else if(exp instanceof Symbol) {
        return getValue(exp, env);
    }
    else if(exp instanceof Lambda) {
        return (x: Value) => {
            return valofRI(exp.body, extendEnv(x, exp.arg, env));
        }   
    }
    else if(exp instanceof App) {
        let rator = valofRI(exp.rator, env);
        let rand = valofRI(exp.rand, env);
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

console.log("Testing function valofRI");
let exp3 = new Parser("((λx.x) 5)").parse();
let exp4 = new Parser("(λx.x)").parse(); 

console.log(valofRI(exp3, initEnv).toString());
let val2 = valofRI(exp4, initEnv);
val2 instanceof Function ? console.log(val2(new Atom(25)).toString()) : console.log(val2.toString());