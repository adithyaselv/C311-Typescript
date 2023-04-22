"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var LambdaCalculus_1 = require("./LambdaCalculus");
var Parser = /** @class */ (function () {
    function Parser(input) {
        this.input = input;
        this.pos = 0;
    }
    Parser.prototype.parse = function () {
        this.skipWhitespace();
        var exp = this.parseExp();
        this.skipWhitespace();
        if (this.pos < this.input.length) {
            throw new Error("Unexpected input");
        }
        return exp;
    };
    Parser.prototype.parseExp = function () {
        this.skipWhitespace();
        var ch = this.peek();
        if (ch === "(") {
            this.consume("(");
            var exp = this.parseAppOrLambda();
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
    };
    Parser.prototype.parseAppOrLambda = function () {
        this.skipWhitespace();
        var ch = this.peek();
        if (ch === "λ") {
            this.consume("λ");
            var symbol = this.parseSymbol();
            this.consume(".");
            var body = this.parseExp();
            return new LambdaCalculus_1.Lambda(symbol, body);
        }
        else if (ch === "+") {
            this.consume("+");
            var left = this.parseExp();
            var right = this.parseExp();
            return new LambdaCalculus_1.Plus(left, right);
        }
        else {
            var rator = this.parseExp();
            var rand = this.parseExp();
            return new LambdaCalculus_1.App(rator, rand);
        }
    };
    Parser.prototype.parseSymbol = function () {
        var name = "";
        while (/[a-zA-Z0-9]/.test(this.peek())) {
            name += this.consume();
        }
        return new LambdaCalculus_1.Symbol(name);
    };
    Parser.prototype.parseAtom = function () {
        var numStr = "";
        while (/[0-9]/.test(this.peek())) {
            numStr += this.consume();
        }
        var num = parseInt(numStr);
        return new LambdaCalculus_1.Atom(num);
    };
    Parser.prototype.skipWhitespace = function () {
        while (/\s/.test(this.peek())) {
            this.consume();
        }
    };
    Parser.prototype.peek = function () {
        return this.input.charAt(this.pos);
    };
    Parser.prototype.consume = function (expected) {
        var ch = this.input.charAt(this.pos);
        if (expected && ch !== expected) {
            throw new Error("Expected ".concat(expected, " but found ").concat(ch));
        }
        this.pos++;
        return ch;
    };
    return Parser;
}());
exports.Parser = Parser;
