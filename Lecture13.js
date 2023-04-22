// Lecture 13. Trampoline
var MakeKfibsub1n = /** @class */ (function () {
    function MakeKfibsub1n(n, k) {
        this.n = n;
        this.k = k;
    }
    return MakeKfibsub1n;
}());
var MakeKfibsub2n = /** @class */ (function () {
    function MakeKfibsub2n(fsub1n, k) {
        this.fsub1n = fsub1n;
        this.k = k;
    }
    return MakeKfibsub2n;
}());
var InitK = /** @class */ (function () {
    function InitK() {
    }
    return InitK;
}());
var Func = /** @class */ (function () {
    function Func(f) {
        this.f = f;
    }
    Func.prototype.jump = function () {
        return this.f();
    };
    return Func;
}());
var Value = /** @class */ (function () {
    function Value(jumpout) {
        this.jumpout = jumpout;
    }
    return Value;
}());
var applyKds;
applyKds = function (k, v) {
    if (k instanceof MakeKfibsub1n) {
        return new Func(function () { return fibcpsds(k.n - 2, new MakeKfibsub2n(v, k.k)); });
    }
    else if (k instanceof MakeKfibsub2n) {
        return new Func(function () { return applyKds(k.k, k.fsub1n + v); });
    }
    else if (k instanceof InitK) {
        return new Value(v);
    }
    else {
        throw new Error("Unknown continuation");
    }
};
var fibcpsds;
fibcpsds = function (n, k) {
    if (n === 0) {
        return new Func(function () { return applyKds(k, 0); });
    }
    else if (n === 1) {
        return new Func(function () { return applyKds(k, 1); });
    }
    else {
        return new Func(function () { return fibcpsds(n - 1, new MakeKfibsub1n(n, k)); });
    }
};
var runTrampoline = function (t) {
    var t$ = t;
    while (t$ instanceof Func) {
        t$ = t$.jump();
    }
    if (t$ instanceof Value) {
        return t$.jumpout;
    }
};
console.log(runTrampoline(fibcpsds(25, new InitK())));
