// Lecture 9: Continuation passing style
var factorial;
factorial = function (n) {
    if (n === 0) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
};
console.log(factorial(5));
var factorial_cps;
factorial_cps = function (n, k) {
    if (n === 0) {
        return k(1);
    }
    else {
        return factorial_cps(n - 1, function (fsub1n) { return k(n * fsub1n); });
    }
};
console.log(factorial_cps(5, function (x) { return x; }));
var fib;
fib = function (n) {
    if (n === 0) {
        return 0;
    }
    else if (n === 1) {
        return 1;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    }
};
console.log(fib(6));
var fib_cps;
fib_cps = function (n, k) {
    if (n === 0) {
        return k(0);
    }
    else if (n === 1) {
        return k(1);
    }
    else {
        return fib_cps(n - 1, function (fsub1n) { return fib_cps(n - 2, function (fsub2n) { return k(fsub1n + fsub2n); }); });
    }
};
console.log(fib_cps(6, function (x) { return x; }));
var curriedplus;
curriedplus = function (x) {
    return function (y) {
        return x + y;
    };
};
// Todo: write a curriedplus_cps
console.log(curriedplus(3)(4));
var curriedplus_cps;
curriedplus_cps = function (x, k) {
    return k(function (y, kk) {
        return kk(x + y);
    });
};
console.log(curriedplus_cps(3, function (threeplus) { return threeplus(4, function (x) { return x; }); }));
var map;
map = function (f, xs) {
    if (xs.length === 0) {
        return [];
    }
    else {
        return [f(xs[0])].concat(map(f, xs.slice(1)));
    }
};
console.log(map(function (x) { return x + 1; }, [1, 2, 3, 4, 5]));
var map_cps;
map_cps = function (f, xs, k) {
    if (xs.length === 0) {
        return k([]);
    }
    else {
        var fx = f(xs[0], function (fx) { return fx; });
        var fxs = map_cps(f, xs.slice(1), function (fxs) { return fxs; });
        return k([fx].concat(fxs));
    }
};
console.log(map_cps(function (x, k) { return k(x + 1); }, [1, 2, 3, 4, 5], function (x) { return x; }));
