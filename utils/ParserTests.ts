import { Parser } from "./Parser";

let parser = new Parser("((λx. x) 5)");

console.log(parser.parse());