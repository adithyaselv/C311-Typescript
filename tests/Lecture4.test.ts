import {ExpEqExp, occurs, occursFree, occursBound} from "../lectures/lecture4/Lecture4";
import { Parser } from "../utils/Parser";
import { Symbol } from "../utils/LambdaCalculus";

let sym1 = new Symbol("x");
let sym2 = new Symbol("y");

let exp1 = new Parser("(lambda (x) x)").parse();
let exp2 = new Parser("(lambda (y) y)").parse();
let exp3 = new Parser("(lambda (x) y)").parse();


describe("Lecture 4 tests", () => {
    test ("ExpEqExp", () => {
        expect(ExpEqExp(sym1, sym1)).toEqual(true);
        expect(ExpEqExp(sym1, sym2)).toEqual(false);
        expect(ExpEqExp(exp1, exp2)).toEqual(false);
        expect(ExpEqExp(exp1, exp3)).toEqual(false);
    });

    test ("occurs", () => {
        expect(occurs(sym1, sym1)).toEqual(true);
        expect(occurs(sym1, sym2)).toEqual(false);
        expect(occurs(sym1, exp1)).toEqual(true);
        expect(occurs(sym1, exp2)).toEqual(false);
        expect(occurs(sym1, exp3)).toEqual(false);
    });

    test ("occursFree", () => {
        expect(occursFree(sym1, sym1)).toEqual(true);
        expect(occursFree(sym1, sym2)).toEqual(false);
        expect(occursFree(sym1, exp1)).toEqual(false);
        expect(occursFree(sym1, exp2)).toEqual(false);
        expect(occursFree(sym1, exp3)).toEqual(false);
    });

    test ("occursBound", () => {
        expect(occursBound(sym1, sym1)).toEqual(false);
        expect(occursBound(sym1, sym2)).toEqual(false);
        expect(occursBound(sym1, exp1)).toEqual(true);
        expect(occursBound(sym1, exp2)).toEqual(false);
        expect(occursBound(sym1, exp3)).toEqual(false);
    });
});
