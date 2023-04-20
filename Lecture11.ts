// Lecture 11: CPS and RI with Continuations

type Cont<A>= (v: A) => A 

let fibcps: (n: number, k: Cont<number>) => number
fibcps = (n, k) => {
    if(n === 0) {
        return k(0);
    }
    else if(n === 1) {
        return k(1);
    }
    else {
        return fibcps(n - 1, (fsub1n: number) => fibcps(n - 2, (fsub2n: number) => k(fsub1n + fsub2n)));
    }
}

console.log(fibcps(6, (x: number) => x))

// Representation Independent CPS

let applyK: (k: Cont<number>, v: number) => number
applyK = (k, v) => k(v)


let makeKfibsub2n = (fsub1n: number, k: Cont<number>) => {
    return (fsub2n: number) => applyK(k, fsub1n + fsub2n);
}

let makeKfibsub1n = (n: number, k: Cont<number>) => {
    return (fsub1n: number) => fibcpsri(n - 2, makeKfibsub2n(fsub1n, k))
}

let initk = (x: number) => x;

let fibcpsri: (n: number, k: Cont<number>) => number
fibcpsri = (n, k) => {
    if(n === 0) {
        return applyK(k, 0);
    }
    else if(n === 1) {
        return applyK(k, 1);
    }
    else {
        return fibcpsri(n - 1, makeKfibsub1n(n, k));
    }
}

console.log(fibcpsri(6, initk));

// Data representation of continuations

class MakeKfibsub1n {
    constructor(readonly n: number, readonly k: DSCont) {}
}

class MakeKfibsub2n {
    constructor(readonly fsub1n: number, readonly k: DSCont) {}
}

class InitK {
    constructor() {}
}

type DSCont = MakeKfibsub1n | MakeKfibsub2n | InitK;

let applyKds: (k: DSCont, v: number) => number
applyKds = (k, v) => {
    if(k instanceof MakeKfibsub1n) {
        return fibcpsds(k.n - 2, new MakeKfibsub2n(v, k.k));
    }
    else if(k instanceof MakeKfibsub2n) {
        return applyKds(k.k, k.fsub1n + v);
    }
    else if(k instanceof InitK) {
        return v;
    }
    else {
        throw new Error("Unknown continuation");
    }
}

let fibcpsds: (n: number, k: DSCont) => number
fibcpsds = (n, k) => {
    if(n === 0) {
        return applyKds(k, 0);
    }
    else if(n === 1) {
        return applyKds(k, 1);
    }
    else {
        return fibcpsds(n - 1, new MakeKfibsub1n(n, k));
    }
}

console.log(fibcpsds(6, new InitK()));