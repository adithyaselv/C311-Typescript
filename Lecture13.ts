// Lecture 13. Trampoline

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


interface Trampoline<T> {
}

class Func<T> implements Trampoline<T> {
    constructor(readonly f: () => Trampoline<T>) {
    }
    jump() {
        return this.f();
    }
}

class Value<T> implements Trampoline<T> {
    constructor(readonly jumpout: T) {
    }
}

let applyKds: (k: DSCont, v: number) => Trampoline<number>
applyKds = (k, v) =>  {
    if(k instanceof MakeKfibsub1n) {
        return new Func<number>(() => fibcpsds(k.n - 2, new MakeKfibsub2n(v, k.k)));
    }
    else if(k instanceof MakeKfibsub2n) {
        return new Func<number>(() => applyKds(k.k, k.fsub1n + v));
    }
    else if(k instanceof InitK) {
        return new Value<number>(v);
    }
    else {
        throw new Error("Unknown continuation");
    }
}

let fibcpsds: (n: number, k: DSCont) => Trampoline<number>
fibcpsds = (n, k) => {
    if(n === 0) {
        return new Func<number>(() => applyKds(k, 0));
    }
    else if(n === 1) {
        return new Func<number>(() => applyKds(k, 1));
    }
    else {
        return new Func<number>(() => fibcpsds(n - 1, new MakeKfibsub1n(n, k)));
    }
}

let runTrampoline: <T>(t: Trampoline<T>) => T = (t) => {
    let t$ = t;
    while (t$ instanceof Func) {
        t$ = t$.jump();
    }
    if(t$ instanceof Value) {
        return t$.jumpout;
    }
}

console.log(runTrampoline(fibcpsds(25, new InitK())));


