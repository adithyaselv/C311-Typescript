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
var aK$;
var v$;
var n$;
var k$;
var applyKds;
applyKds = function () {
    if (aK$ instanceof MakeKfibsub1n) {
        k$ = new MakeKfibsub2n(v$, aK$.k);
        n$ = aK$.n - 2;
        return fibcpsds();
    }
    else if (aK$ instanceof MakeKfibsub2n) {
        v$ = aK$.fsub1n + v$;
        aK$ = aK$.k;
        return applyKds();
    }
    else if (aK$ instanceof InitK) {
        return v$;
    }
    else {
        throw new Error("Unknown continuation");
    }
};
var fibcpsds;
fibcpsds = function () {
    if (n$ === 0) {
        aK$ = k$;
        v$ = 0;
        return applyKds();
    }
    else if (n$ === 1) {
        aK$ = k$;
        v$ = 1;
        return applyKds();
    }
    else {
        k$ = new MakeKfibsub1n(n$, k$);
        n$ = n$ - 1;
        return fibcpsds();
    }
};
n$ = 25;
k$ = new InitK();
console.log(fibcpsds());
