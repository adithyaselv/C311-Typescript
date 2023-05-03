// Lecture 2 tests

import { plus, mult, exp, exp2, G, GG, map, curryiedPlus } from "../lectures/lecture2/Lecture2";

describe("Lecture 2 tests", () => {
    test ("plus", () => {
        expect(plus(3,5)).toEqual(8);
    });

    test ("mult", () => {
        expect(mult(3,5)).toEqual(15);
    });

    test ("exp", () => {
        expect(exp(3,5)).toEqual(243);
    });

    test ("exp2", () => {
        expect(exp2(2,3)).toEqual(16);
    });

    test ("G", () => {
        expect(G(0)(3,5)).toEqual(8);
        expect(G(1)(3,5)).toEqual(15);
        expect(G(2)(3,5)).toEqual(243);
        expect(G(3)(2,3)).toEqual(16);
    });

    test ("GG", () => {
        expect(GG(0)(3,5)).toEqual(8);
        expect(GG(1)(3,5)).toEqual(15);
        expect(GG(2)(3,5)).toEqual(243);
        expect(GG(3)(2,3)).toEqual(16);
    });

    test ("map", () => {
        expect(map((x) => x+1, [1,2,3,4,5])).toEqual([2,3,4,5,6]);
    });

    test ("curryiedPlus", () => {
        expect(curryiedPlus(3)(5)).toEqual(8);
    });
});