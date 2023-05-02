import { Parser } from "../utils/Parser";
import { Atom, Symbol, Lambda, App, Add1, Plus } from "../utils/LambdaCalculus";

let expAtom1 = new Parser("5");
let expAtom2 = new Parser("1729");
let expSymbol1 = new Parser("x");
let expSymbol2 = new Parser("abc");
let expLambda1 = new Parser("(lambda (x) x)");
let expLambda2 = new Parser("(λ(x) x)");
let expApp1 = new Parser("((λ(x) x) 5)");
let expApp2 = new Parser("((λ(x) (+ 10 10)) (add1 5))");

describe("Parser Positive tests", () => {
    test ("parse atom 1", () => {
        expect(expAtom1.parse()).toEqual(new Atom(5));
    });

    test ("parse atom 2", () => {
        expect(expAtom2.parse()).toEqual(new Atom(1729));
    });

    test ("parse symbol 1", () => {
        expect(expSymbol1.parse()).toEqual(new Symbol("x"));
    });

    test ("parse symbol 2", () => {
        expect(expSymbol2.parse()).toEqual(new Symbol("abc"));
    });

    test ("parse Lambda 1", () => {
        expect(expLambda1.parse()).toEqual(new Lambda(new Symbol("x"), new Symbol("x")));
    });

    test ("parse Lambda 2", () => {
        expect(expLambda2.parse()).toEqual(new Lambda(new Symbol("x"), new Symbol("x")));
    });

    test ("parse App 1", () => {
        expect(expApp1.parse()).toEqual(new App(new Lambda(new Symbol("x"), new Symbol("x")), new Atom(5)));
    });

    test ("parse App 2", () => {
        expect(expApp2.parse()).toEqual(new App(new Lambda(new Symbol("x"), new Plus(new Atom(10), new Atom(10))), new Add1(new Atom(5))));
    });
});

// describe negative tests

let expAtom3 = new Parser("5 5");
let expSymbol3 = new Parser("x y");
let expLambda3 = new Parser("(lambda (x) x) 5");
let expApp3 = new Parser("((λ(x) x) 5) 5");
let expfunc1 = new Parser("(+ 10 10 20)");
let expfunc2 = new Parser("(add1 x 10)");

describe("Parser negative tests", () => {
    test ("parse atom 3", () => {
        expect(() => expAtom3.parse()).toThrow();
    });

    test ("parse symbol 3", () => {
        expect(() => expSymbol3.parse()).toThrow();
    });

    test ("parse Lambda 3", () => {
        expect(() => expLambda3.parse()).toThrow();
    });

    test ("parse App 3", () => {
        expect(() => expApp3.parse()).toThrow();
    });

    test ("parse func 1", () => {
        expect(() => expfunc1.parse()).toThrow();
    });

    test ("parse func 2", () => {
        expect(() => expfunc2.parse()).toThrow();
    });
});
