// Lecture 1 tests

import { plus, mult, exp, countoccurs, countoccursNest, sum, sumNest} from "../lectures/lecture1/Lecture1";

describe("Lecture 1 tests", () => {
    test ("plus", () => {
        expect(plus(3,5)).toEqual(8);
    });

    test ("mult", () => {
        expect(mult(3,5)).toEqual(15);
    });

    test ("exp", () => {
        expect(exp(3,5)).toEqual(243);
    });

    test ("countoccurs", () => {
        expect(countoccurs(3, [5,3,3,3,4,9,0])).toEqual(3);
    });

    test ("countoccursNest", () => {
        expect(countoccursNest(3, [5,3,3,[1, 2, 3],4,9,0])).toEqual(3);
    });

    test ("sum", () => {
        expect(sum([1,2,3,4,5])).toEqual(15);
    });

    test ("sumNest", () => {
        expect(sumNest([[0,1],2,3,[1, 3],5])).toEqual(15);
    });
});