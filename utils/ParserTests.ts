import { Parser } from "./Parser";

let parser = new Parser("((λ(x) x) 5)");

console.log(parser.parse());