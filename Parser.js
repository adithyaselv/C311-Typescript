"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const LambdaCalculus_ts_1 = require("./LambdaCalculus.ts");
class Parser {
    constructor(input) {
        this.input = input;
        this.pos = 0;
    }
    parse() {
        this.skipWhitespace();
        let exp = this.parseExp();
        this.skipWhitespace();
        if (this.pos < this.input.length) {
            throw new Error("Unexpected input");
        }
        return exp;
    }
    parseExp() {
        this.skipWhitespace();
        let ch = this.peek();
        if (ch === "(") {
            this.consume("(");
            let exp = this.parseAppOrLambda();
            this.consume(")");
            return exp;
        }
        else if (/[a-zA-Z]/.test(ch)) {
            return this.parseSymbol();
        }
        else if (/[0-9]/.test(ch)) {
            return this.parseAtom();
        }
        else {
            throw new Error("Invalid input");
        }
    }
    parseAppOrLambda() {
        this.skipWhitespace();
        let ch = this.peek();
        if (ch === "λ") {
            this.consume("λ");
            let symbol = this.parseSymbol();
            this.consume(".");
            let body = this.parseExp();
            return new LambdaCalculus_ts_1.Lambda(symbol, body);
        }
        else {
            let rator = this.parseExp();
            let rand = this.parseExp();
            return new LambdaCalculus_ts_1.App(rator, rand);
        }
    }
    parseSymbol() {
        let name = "";
        while (/[a-zA-Z0-9]/.test(this.peek())) {
            name += this.consume();
        }
        return new LambdaCalculus_ts_1.Symbol(name);
    }
    parseAtom() {
        let numStr = "";
        while (/[0-9]/.test(this.peek())) {
            numStr += this.consume();
        }
        let num = parseInt(numStr);
        return new LambdaCalculus_ts_1.Atom(num);
    }
    skipWhitespace() {
        while (/\s/.test(this.peek())) {
            this.consume();
        }
    }
    peek() {
        return this.input.charAt(this.pos);
    }
    consume(expected) {
        let ch = this.input.charAt(this.pos);
        if (expected && ch !== expected) {
            throw new Error(`Expected ${expected} but found ${ch}`);
        }
        this.pos++;
        return ch;
    }
}
exports.Parser = Parser;
