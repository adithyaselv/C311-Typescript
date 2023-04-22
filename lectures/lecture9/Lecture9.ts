// Lecture 9: Continuation passing style

let factorial: (n: number) => number
factorial = (n) => {
    if(n === 0) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(5))

// Continuation
type Cont<A>= (v: A) => A 

let factorial_cps: (n: number, k: Cont<number>) => number
factorial_cps = (n, k) => {
    if(n === 0) {
        return k(1);
    }
    else {
        return factorial_cps(n - 1, (fsub1n: number) => k(n * fsub1n));
    }
}


console.log(factorial_cps(5, (x: number) => x))

let fib: (n: number) => number
fib = (n) => {
    if(n === 0) {
        return 0;
    }
    else if(n === 1) {
        return 1;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    }
}

console.log(fib(6))

let fib_cps: (n: number, k: Cont<number>) => number
fib_cps = (n, k) => {
    if(n === 0) {
        return k(0);
    }
    else if(n === 1) {
        return k(1);
    }
    else {
        return fib_cps(n - 1, (fsub1n: number) => fib_cps(n - 2, (fsub2n: number) => k(fsub1n + fsub2n)));
    }
}

console.log(fib_cps(6, (x: number) => x))

let curriedplus: (x: number) => (y: number) => number
curriedplus = (x) => {
    return (y) => {
        return x + y;
    }
}

// Todo: write a curriedplus_cps

console.log(curriedplus(3)(4))

 type Cont2<A> = (i: (v: A, k: Cont<A>) => A) => A

let curriedplus_cps: (x: number, k: Cont2<number>) => number
curriedplus_cps = (x, k) => {
    return k ((y, kk) => {
        return kk(x + y);
    });
}

console.log(curriedplus_cps(3, (threeplus) => threeplus(4, (x: number) => x)))


let map: <A, B>(f: (x: A) => B, xs: A[]) => B[]
map = (f, xs) => {
    if(xs.length === 0) {
        return [];
    }
    else {
        return [f(xs[0])].concat(map(f, xs.slice(1)));
    }
}

console.log(map((x: number) => x + 1, [1, 2, 3, 4, 5]))

let map_cps: <A, B>(f: (x: A, kk: Cont<B>) => B, xs: A[], k: Cont<B[]>) => B[]
map_cps = (f, xs, k) => {
    if(xs.length === 0) {
        return k([]);
    }
    else {
        let fx = f(xs[0], (fx) => fx);
        let fxs = map_cps(f, xs.slice(1), (fxs) => fxs);
        return k([fx].concat(fxs));
    }
}

console.log(map_cps((x: number, k: Cont<number>) => k(x + 1), [1, 2, 3, 4, 5], (x: number[]) => x))


