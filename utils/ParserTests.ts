import { Parser } from "./Parser";

let exp1 = new Parser("((λ(x) x) 5)");
let exp2 = new Parser("((λ(x) (+ 10 10)) (add1 5))");

console.log(exp1.parse());
console.log(exp2.parse());