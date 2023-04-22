// Lecture 12: A-Normal Form & Registerization

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
        let n$ = k.n - 2;
        let k$ = new MakeKfibsub2n(v, k.k);
        return fibcpsds(n$, k$);
    }
    else if(k instanceof MakeKfibsub2n) {
        let aK$ = k.k;
        let v$ = k.fsub1n + v;
        return applyKds(aK$, v$);
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
        let aK$ = k;
        let v$ = 0;
        return applyKds(aK$, v$);
    }
    else if(n === 1) {
        let aK$ = k;
        let v$ = 1;
        return applyKds(aK$, v$);
    }
    else {
        let n$ = n - 1;
        let k$ = new MakeKfibsub1n(n, k);
        return fibcpsds(n$, k$);
    }
}

let n$ = 6;
let k$ = new InitK();
console.log(fibcpsds(n$, k$));