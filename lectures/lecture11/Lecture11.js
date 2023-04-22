// Lecture 11: CPS and RI with Continuations
var fibcps;
fibcps = function (n, k) {
    if (n === 0) {
        return k(0);
    }
    else if (n === 1) {
        return k(1);
    }
    else {
        return fibcps(n - 1, function (fsub1n) { return fibcps(n - 2, function (fsub2n) { return k(fsub1n + fsub2n); }); });
    }
};
console.log(fibcps(6, function (x) { return x; }));
// Representation Independent CPS
var applyK;
applyK = function (k, v) { return k(v); };
var makeKfibsub2n = function (fsub1n, k) {
    return function (fsub2n) { return applyK(k, fsub1n + fsub2n); };
};
var makeKfibsub1n = function (n, k) {
    return function (fsub1n) { return fibcpsri(n - 2, makeKfibsub2n(fsub1n, k)); };
};
var initk = function (x) { return x; };
var fibcpsri;
fibcpsri = function (n, k) {
    if (n === 0) {
        return applyK(k, 0);
    }
    else if (n === 1) {
        return applyK(k, 1);
    }
    else {
        return fibcpsri(n - 1, makeKfibsub1n(n, k));
    }
};
console.log(fibcpsri(6, initk));
// Data representation of continuations
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
var applyKds;
applyKds = function (k, v) {
    if (k instanceof MakeKfibsub1n) {
        return fibcpsds(k.n - 2, new MakeKfibsub2n(v, k.k));
    }
    else if (k instanceof MakeKfibsub2n) {
        return applyKds(k.k, k.fsub1n + v);
    }
    else if (k instanceof InitK) {
        return v;
    }
    else {
        throw new Error("Unknown continuation");
    }
};
var fibcpsds;
fibcpsds = function (n, k) {
    if (n === 0) {
        return applyKds(k, 0);
    }
    else if (n === 1) {
        return applyKds(k, 1);
    }
    else {
        return fibcpsds(n - 1, new MakeKfibsub1n(n, k));
    }
};
console.log(fibcpsds(6, new InitK()));
