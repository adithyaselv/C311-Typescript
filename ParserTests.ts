import { Parser } from "./Parser.ts";

let parser = new Parser("((λx. x) 5)");

console.log(parser.parse());