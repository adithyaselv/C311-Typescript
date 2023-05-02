import { Parser } from "./Parser";

let exp1 = new Parser("((λ(x) x) 5)");
let exp2 = new Parser("((λ(x) (+ 10 10)) (add1 5))");
let exp3 = new Parser("((lambda (x) (+ x 10)) (sub1 (add1 5)))");

console.log(exp1.parse());
console.log(exp2.parse());
console.log(exp3.parse());