"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var parser = new Parser_1.Parser("((λ(x) x) 5)");
console.log(parser.parse());
