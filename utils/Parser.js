"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var LambdaCalculus_1 = require("./LambdaCalculus");
var Parser = /** @class */ (function () {
    function Parser(input) {
        this.input = input;
        this.pos = 0;
        this.tokens = [];
        this.tokenise();
        console.log(this.tokens);
    }
    Parser.prototype.parse = function () {
        this.skipWhitespace();
        var exp = this.parseExp();
        this.skipWhitespace();
        if (this.pos < this.tokens.length) {
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
            this.consume("(");
            var symbol = this.parseSymbol();
            this.consume(")");
            var body = this.parseExp();
            return new LambdaCalculus_1.Lambda(symbol, body);
        }
        else if (ch === "+") {
            this.consume("+");
            var left = this.parseExp();
            var right = this.parseExp();
            return new LambdaCalculus_1.Plus(left, right);
        }
        else if (ch === "add1") {
            this.consume("add1");
            var e = this.parseExp();
            return new LambdaCalculus_1.Add1(e);
        }
        else {
            var rator = this.parseExp();
            var rand = this.parseExp();
            return new LambdaCalculus_1.App(rator, rand);
        }
    };
    Parser.prototype.parseSymbol = function () {
        var name = this.peek();
        this.consume(name);
        return new LambdaCalculus_1.Symbol(name);
    };
    Parser.prototype.parseAtom = function () {
        var numStr = this.peek();
        this.consume(numStr);
        var num = parseInt(numStr);
        return new LambdaCalculus_1.Atom(num);
    };
    Parser.prototype.skipWhitespace = function () {
        while (/\s/.test(this.peek())) {
            this.consume();
        }
    };
    Parser.prototype.peek = function () {
        return this.tokens[this.pos];
    };
    Parser.prototype.consume = function (expected) {
        var ch = this.tokens[this.pos];
        if (expected && ch !== expected) {
            throw new Error("Expected ".concat(expected, " but found ").concat(ch));
        }
        this.pos++;
        return ch;
    };
    Parser.prototype.tokenise = function () {
        // Remove leading and trailing whitespace
        var trimmedInput = this.input.trim();
        // Split the S-expression into tokens
        var regex = /([()'"]|\s+)/g;
        this.tokens = trimmedInput.split(regex).filter(function (token) { return !token.match(/^\s*$/); });
    };
    return Parser;
}());
exports.Parser = Parser;
