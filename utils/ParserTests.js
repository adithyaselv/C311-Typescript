"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var exp1 = new Parser_1.Parser("((λ(x) x) 5)");
var exp2 = new Parser_1.Parser("((λ(x) (+ 10 10)) (add1 5))");
console.log(exp1.parse());
console.log(exp2.parse());
