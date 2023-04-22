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
        k$ = new MakeKfibsub2n(v$, aK$.k);
        n$ = aK$.n - 2;
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
        k$ = new MakeKfibsub1n(n$, k$);
        n$ = n$ - 1;
        return fibcpsds();
    }
}

n$ = 6;
k$ = new InitK();
console.log(fibcpsds());