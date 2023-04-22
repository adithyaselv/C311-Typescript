// Lecture 15: Peek into Unify and logic programming
var Var = /** @class */ (function () {
    function Var(name) {
        this.name = name;
    }
    return Var;
}());
var Num = /** @class */ (function () {
    function Num(value) {
        this.value = value;
    }
    return Num;
}());
var Sym = /** @class */ (function () {
    function Sym(value) {
        this.value = value;
    }
    return Sym;
}());
var Pair = /** @class */ (function () {
    function Pair(left, right) {
        this.left = left;
        this.right = right;
    }
    return Pair;
}());
var walk;
walk = function (t, env) {
    if (t instanceof Var) {
        var v = env.get(t.name);
        if (v === undefined) {
            return t;
        }
        else {
            return walk(v, env);
        }
    }
    else {
        return t;
    }
};
var occurs;
occurs = function (v, t, env) {
    var w = walk(t, env);
    if (w instanceof Var) {
        return v.name === w.name;
    }
    else if (w instanceof Pair) {
        return occurs(v, w.left, env) || occurs(v, w.right, env);
    }
    else {
        return false;
    }
};
var extendEnv;
extendEnv = function (v, t, env) {
    if (occurs(v, t, env)) {
        throw new Error("Occurs check failed");
    }
    else {
        return new Map(env).set(v.name, t);
    }
};
var unify;
unify = function (t1, t2, env) {
    var w1 = walk(t1, env);
    var w2 = walk(t2, env);
    if (w1 instanceof Var) {
        return extendEnv(w1, w2, env);
    }
    else if (w2 instanceof Var) {
        return extendEnv(w2, w1, env);
    }
    else if (w1 instanceof Num && w2 instanceof Num) {
        if (w1.value === w2.value) {
            return env;
        }
        else {
            throw new Error("Unification failed");
        }
    }
    else if (w1 instanceof Sym && w2 instanceof Sym) {
        if (w1.value === w2.value) {
            return env;
        }
        else {
            throw new Error("Unification failed");
        }
    }
    else if (w1 instanceof Pair && w2 instanceof Pair) {
        return unify(w1.right, w2.right, unify(w1.left, w2.left, env));
    }
    else {
        throw new Error("Unification failed");
    }
};
var initSubst = new Map();
var x = new Var("x");
var y = new Var("y");
var t1 = new Pair(x, new Num(42));
var t2 = new Pair(new Sym("cat"), y);
var subst = unify(t1, t2, initSubst);
console.log(subst);
var t3 = new Pair(x, y);
var t4 = new Pair(y, new Pair(x, y));
var subst2 = unify(t3, t4, initSubst);
console.log(subst2);
