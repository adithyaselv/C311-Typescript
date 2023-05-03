import { valof } from "../lectures/lecture5/Lecture5";
import { Parser } from "../utils/Parser";
import { Atom, Symbol } from "../utils/LambdaCalculus";

let exp1 = new Parser("((λ(x)x) 5)").parse();
let exp2 = new Parser("(λ(x)x)").parse();


let initEnv = (x: Symbol) => {throw new Error("Unbound variable")}

let valofexp2 = valof(exp2, initEnv);
let applyvalofexp2 = valofexp2 instanceof Function ? valofexp2(new Atom(25)) : valofexp2;

let exp3 = new Parser("((λ(x) ((λ(y) x) 15)) 5)").parse();
let exp4 = new Parser("((λ(x) ((λ(y) y) 15)) 5)").parse();

describe("Lecture 5 tests", () => {
    test ("valof", () => {
        expect(valof(exp1, initEnv).toString()).toEqual("5");
        expect(applyvalofexp2.toString()).toEqual("25");
        expect(valof(exp3, initEnv).toString()).toEqual("5");
        expect(valof(exp4, initEnv).toString()).toEqual("15");
    });
});