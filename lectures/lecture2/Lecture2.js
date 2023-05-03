"use strict";
// Lecture 2: Natural Recursion extension
// Ackermann function, currying
Object.defineProperty(exports, "__esModule", { value: true });
exports.curryiedPlus = exports.map = exports.GG = exports.G = exports.exp2 = exports.exp = exports.mult = exports.plus = void 0;
var plus;
exports.plus = plus;
exports.plus = plus = function (n, m) {
    if (m == 0) {
        return n;
    }
    else {
        return 1 + plus(n, m - 1);
    }
};
console.log("Testing function plus");
console.log(plus(3, 5));
var mult;
exports.mult = mult;
exports.mult = mult = function (n, m) {
    if (m == 0) {
        return 0;
    }
    else {
        return m + mult(n, m - 1);
    }
};
console.log("Testing function mult");
console.log(mult(3, 5));
var exp;
exports.exp = exp;
exports.exp = exp = function (n, m) {
    if (m == 0) {
        return 1;
    }
    else {
        return n * exp(n, m - 1);
    }
};
console.log("Testing function exp");
console.log(exp(3, 5));
var exp2;
exports.exp2 = exp2;
exports.exp2 = exp2 = function (n, m) {
    if (m == 0) {
        return 1;
    }
    else {
        return exp(n, exp2(n, m - 1));
    }
};
console.log("Testing function exp2");
console.log(exp2(2, 3));
var G;
exports.G = G;
exports.G = G = function (i) {
    return function (n, m) {
        if (i == 0) {
            if (m == 0) {
                return n;
            }
            else {
                return 1 + G(i)(n, m - 1);
            }
        }
        else if (i == 1) {
            if (m == 0) {
                return 0;
            }
            else {
                return G(i - 1)(n, G(i)(n, m - 1));
            }
        }
        else {
            if (m == 0) {
                return 1;
            }
            else {
                return G(i - 1)(n, G(i)(n, m - 1));
            }
        }
    };
};
// Testing G
console.log("Testing function G");
console.log(G(0)(3, 5));
console.log(G(1)(3, 5));
console.log(G(2)(3, 5));
console.log(G(3)(2, 3));
var GG;
exports.GG = GG;
exports.GG = GG = function (i) {
    return function (n, m) {
        if (i == 0) {
            return m == 0 ? n : 1 + GG(i)(n, m - 1);
        }
        else if (i == 1) {
            return m == 0 ? 0 : GG(i - 1)(n, GG(i)(n, m - 1));
        }
        else {
            return m == 0 ? 1 : GG(i - 1)(n, GG(i)(n, m - 1));
        }
    };
};
// Testing GG
console.log("Testing function GG");
console.log(G(0)(3, 5));
console.log(G(1)(3, 5));
console.log(G(2)(3, 5));
console.log(G(3)(2, 3));
var map;
exports.map = map;
exports.map = map = function (f, li) {
    if (li.length == 0) {
        return [];
    }
    else {
        return [f(li[0])].concat(map(f, li.slice(1)));
    }
};
var add1;
add1 = function (n) {
    return n + 1;
};
console.log("Testing function map");
console.log(map(add1, [1, 2, 3, 4, 5]));
var curryiedPlus;
exports.curryiedPlus = curryiedPlus;
exports.curryiedPlus = curryiedPlus = function (n) {
    return function (m) {
        return n + m;
    };
};
console.log("Testing function curryiedPlus");
console.log(curryiedPlus(3)(5));
