import { valofRI } from "../lectures/lecture6/Lecture6_1";
import { valofRIDS, Env } from "../lectures/lecture6/Lecture6_2";
import { Parser } from "../utils/Parser";
import { Symbol } from "../utils/LambdaCalculus";


let exp1 = new Parser("((λ(x)x) 5)").parse();
let exp2 = new Parser("(λ(x)x)").parse();

let initEnv = (x: Symbol) => {throw new Error("Unbound variable")}
let initEnvDS: Env = []

let exp3 = new Parser("((λ(x) ((λ(y) x) 15)) 5)").parse();
let exp4 = new Parser("((λ(x) ((λ(y) y) 15)) 5)").parse();



describe("Lecture 6 tests", () => {
    test ("valofRI", () => {
        expect(valofRI(exp1, initEnv).toString()).toEqual("5");
        // expect(valofRI(exp2, initEnv)).toEqual(exp2);
        expect(valofRI(exp3, initEnv).toString()).toEqual("5");
        expect(valofRI(exp4, initEnv).toString()).toEqual("15");
    });

    test ("valofRIDS", () => {
        expect(valofRIDS(exp1, initEnvDS).toString()).toEqual("5");
        // expect(valofRIDS(exp2, initEnvDS)).toEqual(exp2);
        expect(valofRIDS(exp3, initEnvDS).toString()).toEqual("5");
        expect(valofRIDS(exp4, initEnvDS).toString()).toEqual("15");
    });
});