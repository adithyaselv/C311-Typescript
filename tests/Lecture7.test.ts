import { valofRI, Env } from "../lectures/lecture7/Lecture7";
import { Parser } from "../utils/Parser";

let exp1 = new Parser("((λ(x)x) 5)").parse();
let exp2 = new Parser("(λ(x)x)").parse();

let initEnvDS: Env = []

let exp3 = new Parser("((λ(x) ((λ(y) x) 15)) 5)").parse();
let exp4 = new Parser("((λ(x) ((λ(y) y) 15)) 5)").parse();

describe("Lecture 7", () => {
    test("valofRI", () => {
        expect(valofRI(exp1, initEnvDS).toString()).toEqual("5");
        // expect(valofRI(exp2, initEnvDS)).toEqual();
        expect(valofRI(exp3, initEnvDS).toString()).toEqual("5");
        expect(valofRI(exp4, initEnvDS).toString()).toEqual("15");
    });
});
