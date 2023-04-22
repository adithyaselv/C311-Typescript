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

let aK$ : DSCont;
let v$ : number;

let n$: number;
let k$: DSCont;

let applyKds: () => number
applyKds = () => {
    if(aK$ instanceof MakeKfibsub1n) {
        n$ = aK$.n - 2;
        k$ = new MakeKfibsub2n(v$, aK$.k);
        return fibcpsds();
    }
    else if(aK$ instanceof MakeKfibsub2n) {
        v$ = aK$.fsub1n + v$;
        aK$ = aK$.k;
        return applyKds();
    }
    else if(aK$ instanceof InitK) {
        return v$;
    }
    else {
        throw new Error("Unknown continuation");
    }
}

let fibcpsds: () => number
fibcpsds = () => {
    if(n$ === 0) {
        aK$ = k$;
        v$ = 0;
        return applyKds();
    }
    else if(n$ === 1) {
        aK$ = k$;
        v$ = 1;
        return applyKds();
    }
    else {
        n$ = n$ - 1;
        k$ = new MakeKfibsub1n(n$, k$);
        return fibcpsds();
    }
}

let n$ = 6;
let k$ = new InitK();
console.log(fibcpsds(n$, k$));