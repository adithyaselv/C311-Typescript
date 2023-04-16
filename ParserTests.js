"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_ts_1 = require("./Parser.ts");
let parser = new Parser_ts_1.Parser("((λx. x) 5)");
console.log(parser.parse());
