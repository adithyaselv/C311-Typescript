"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaCalculus_1 = require("../../utils/LambdaCalculus");
var Parser_1 = require("../../utils/Parser");
var applyEnv = function (env, x, k) {
    return env(x, k);
};
var initEnv = function (x, k) {
    throw new Error("Unbound variable");
};
var extendEnv = function (env, arg, v) {
    return function (y, ek) {
        return y.val === arg.val ? ek(v) : applyEnv(env, y, ek);
    };
};
var randK = function (rator, k) {
    return function (rand) {
        if (rator instanceof Function) {
            return rator(rand, k);
        }
        else {
            throw new Error("rator is not a lambda");
        }
    };
};
var ratorK = function (exp, env, k) {
    return function (rator) {
        return valofcps(exp.rand, env, randK(rator, k));
    };
};
var makeClosure = function (exp, env) {
    return function (x, lk) {
        return valofcps(exp.body, extendEnv(env, exp.arg, x), lk);
    };
};
var applyK;
applyK = function (k, v) {
    return k(v);
};
// CPS interpreter
var valofcps;
valofcps = function (exp, env, k) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return applyK(k, exp);
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return applyEnv(env, exp, k);
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return applyK(k, makeClosure(exp, env));
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        return valofcps(exp.rator, env, ratorK(exp, env, k));
    }
    else {
        throw new Error("Invalid input");
    }
};
console.log("Testing function valof");
// let exp1 = new App(new Lambda(new Symbol("x"), new Symbol("x")), new Atom(5));
// let exp2 = new Lambda(new Symbol("x"), new Symbol("x"));
var exp1 = new Parser_1.Parser("((λ(x)x) 5)").parse();
var exp2 = new Parser_1.Parser("(λ(x)x)").parse();
console.log("Testing function valofcps");
console.log(valofcps(exp1, initEnv, function (v) { return v; }).toString());
var val2 = valofcps(exp2, initEnv, function (v) { return v; });
val2 instanceof Function ? console.log(val2(new LambdaCalculus_1.Atom(25), function (v) { return v; }).toString()) : console.log(val2.toString());
// Todo: generate a data structure version of the above code
var MakeRatorK = /** @class */ (function () {
    function MakeRatorK(exp, env, k) {
        this.exp = exp;
        this.env = env;
        this.k = k;
    }
    return MakeRatorK;
}());
var MakeRandK = /** @class */ (function () {
    function MakeRandK(rator, k) {
        this.rator = rator;
        this.k = k;
    }
    return MakeRandK;
}());
var InitK = /** @class */ (function () {
    function InitK() {
    }
    return InitK;
}());
var makeClosureDS = function (exp, env) {
    return function (x, lk) {
        return valofcpsDS(exp.body, extendEnvDS(env, exp.arg, x), lk);
    };
};
var extendEnvDS = function (env, arg, v) {
    return function (y, ek) {
        return y.val === arg.val ? v : applyEnvDS(env, y, ek);
    };
};
var applyEnvDS = function (env, x, k) {
    return env(x, k);
};
var initEnvDS = function (x, k) {
    throw new Error("Unbound variable");
};
var applyKds;
applyKds = function (c, v) {
    if (c instanceof MakeRatorK) {
        return valofcpsDS(c.exp.rand, c.env, new MakeRandK(v, c.k));
    }
    else if (c instanceof MakeRandK) {
        if (c.rator instanceof Function) {
            return c.rator(v, c.k);
        }
        else {
            throw new Error("rator is not a lambda");
        }
    }
    else if (c instanceof InitK) {
        return v;
    }
    else {
        throw new Error("Invalid input");
    }
};
var valofcpsDS;
valofcpsDS = function (exp, env, k) {
    if (exp instanceof LambdaCalculus_1.Atom) {
        return applyKds(k, exp);
    }
    else if (exp instanceof LambdaCalculus_1.Symbol) {
        return applyEnvDS(env, exp, k);
    }
    else if (exp instanceof LambdaCalculus_1.Lambda) {
        return applyKds(k, makeClosureDS(exp, env));
    }
    else if (exp instanceof LambdaCalculus_1.App) {
        return valofcpsDS(exp.rator, env, new MakeRatorK(exp, env, k));
    }
    else {
        throw new Error("Invalid input");
    }
};
console.log("Testing function valofcpsDS");
console.log(valofcpsDS(exp1, initEnvDS, new InitK()).toString());
var val2ds = valofcpsDS(exp2, initEnvDS, new InitK());
val2ds instanceof Function ? console.log(val2ds(new LambdaCalculus_1.Atom(25), new InitK()).toString()) : console.log(val2ds.toString());
