// Lecture 12: A-Normal Form & Registerization
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
        var n$_1 = k.n - 2;
        var k$_1 = new MakeKfibsub2n(v, k.k);
        return fibcpsds(n$_1, k$_1);
    }
    else if (k instanceof MakeKfibsub2n) {
        var aK$ = k.k;
        var v$ = k.fsub1n + v;
        return applyKds(aK$, v$);
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
        var aK$ = k;
        var v$ = 0;
        return applyKds(aK$, v$);
    }
    else if (n === 1) {
        var aK$ = k;
        var v$ = 1;
        return applyKds(aK$, v$);
    }
    else {
        var n$_2 = n - 1;
        var k$_2 = new MakeKfibsub1n(n, k);
        return fibcpsds(n$_2, k$_2);
    }
};
var n$ = 6;
var k$ = new InitK();
console.log(fibcpsds(n$, k$));
