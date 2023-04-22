// Lecture 15: Peek into Unify and logic programming

/*
A Term can be either
Var
Number -- like 42
Symbol -- like cat
(Pair Term Term)
*/

interface Term {
}

class Var implements Term {
    constructor(readonly name: string) {
    }
}

class Num implements Term {
    constructor(readonly value: number) {
    }
}

class Sym implements Term {
    constructor(readonly value: string) {
    }
}

class Pair implements Term {
    constructor(readonly left: Term, readonly right: Term) {
    }
}

let walk: (t: Term, env: Map<string, Term>) => Term
walk = (t, env) => {
    if(t instanceof Var) {
        let v = env.get(t.name);
        if(v === undefined) {
            return t;
        }
        else {
            return walk(v, env);
        }
    }
    else {
        return t;
    }
}

let occurs: (v: Var, t: Term, env: Map<string, Term>) => boolean
occurs = (v, t, env) => {
    let w = walk(t, env);
    if(w instanceof Var) {
        return v.name === w.name;
    }
    else if(w instanceof Pair) {
        return occurs(v, w.left, env) || occurs(v, w.right, env);
    }
    else {
        return false;
    }
}

let extendEnv: (v: Var, t: Term, env: Map<string, Term>) => Map<string, Term>
extendEnv = (v, t, env) => {
    if(occurs(v, t, env)) {
        throw new Error("Occurs check failed");
    }
    else {
        return new Map(env).set(v.name, t);
    }
}

let unify: (t1: Term, t2: Term, env: Map<string, Term>) => Map<string, Term>
unify = (t1, t2, env) => {
    let w1 = walk(t1, env);
    let w2 = walk(t2, env);
    if(w1 instanceof Var) {
        return extendEnv(w1, w2, env);
    }
    else if(w2 instanceof Var) {
        return extendEnv(w2, w1, env);
    }
    else if(w1 instanceof Num && w2 instanceof Num) {
        if(w1.value === w2.value) {
            return env;
        }
        else {
            throw new Error("Unification failed");
        }
    }
    else if(w1 instanceof Sym && w2 instanceof Sym) {
        if(w1.value === w2.value) {
            return env;
        }
        else {
            throw new Error("Unification failed");
        }
    }
    else if(w1 instanceof Pair && w2 instanceof Pair) {
        return unify(w1.right, w2.right, unify(w1.left, w2.left, env));
    }
    else {
        throw new Error("Unification failed");
    }
}

let initSubst: Map<string, Term> = new Map();

let x = new Var("x");
let y = new Var("y");

let t1 = new Pair(x, new Num(42));
let t2 = new Pair(new Sym("cat"), y);

let subst = unify(t1, t2, initSubst);

console.log(subst);

let t3 = new Pair(x,y);
let t4 = new Pair(y, new Pair(x,y));

// should fail
let subst2 = unify(t3, t4, initSubst);

console.log(subst2);