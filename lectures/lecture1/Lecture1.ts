// Lecture 1 : Covers basic natural recursion
// From the foundations of Natural numbers and Induction

let plus: (n: number, m: number) => number 

plus = (n, m) => {
    if(m == 0) {
        return n;
    }
    else {
        return 1 + plus(n, m-1);
    }
}

console.log(plus(3,5));

let mult: (n: number, m: number) => number 

mult = (n,m) => {
    if(m == 0) {
        return 0;
    }
    else {
        return m + mult(n, m-1);
    }
}

console.log(mult(3,5));

let exp: (n: number, m: number) => number 

exp = (n,m) => {
    if(m == 0) {
        return 1;
    }
    else {
        return n * exp(n, m-1);
    }
} 

console.log(exp(3,5));

let countoccurs:<T> (a:T, li: T[]) => number 

countoccurs = (a, li) => {
    if(li.length == 0) {
        return 0;
    }
    else if(li[0] == a) {
        return 1 + countoccurs(a, li.slice(1));
    }
    else {
        return countoccurs(a, li.slice(1));
    }
}

console.log(countoccurs(3, [5,3,3,3,4,9,0]));

type Nesting = number | Nesting[]
type NestedList = Nesting[]

let countoccursNest: (a: number, li: NestedList) => number

countoccursNest = (a, li) => {
    if(li.length == 0) {
        return 0;
    }
    else if(li[0] == a) {
        return 1 + countoccursNest(a, li.slice(1));
    }
    else if(Array.isArray(li[0])) {
        return countoccursNest(a, li[0]) + countoccursNest(a, li.slice(1));
    }
    else {
        return countoccursNest(a, li.slice(1));
    }
}

console.log(countoccursNest(3, [5,5,3,3,[1,2,3],4,[1, 3],0]));

let sum: (li: number[]) => number
sum = (li) => {
    if(li.length == 0) {
        return 0;
    }
    else {
        return li[0] + sum(li.slice(1));
    }
}

//testing sum
console.log(sum([1,2,3,4,5]));

let sumNest: (li: NestedList) => number
sumNest = (li) => {
    if(li.length == 0) {
        return 0;
    }
    else if(Array.isArray(li[0])) {
        return sumNest(li[0]) + sumNest(li.slice(1));
    }
    else {
        return li[0] + sumNest(li.slice(1));
    }
}

//testing sumNest
console.log(sumNest([1,2,3,4,5]));
console.log(sumNest([1,2,3,[1,2,3],4,[1, 3],0]));

export {plus, mult, exp, countoccurs, countoccursNest, sum, sumNest};