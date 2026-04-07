"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,1]],
    ["ω", [1,1]],
    ["ω^2", [2,1]],
    ["ω^ω", limit],
]);

// Stringify

export function parse(ord) {
    let str = "";
    for (let i = 0; i < ord.length; i += 2) {
        str += `[${ord[i]},${ord[i + 1]}]`
    }
    return str;
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-2) === 0;}

export function rank(a, b) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return a.length > b.length;
}

// Expansion

export function getLimit(num) {return [num, 1];}

export function expand(ord, num) {
    const [pow, mul] = ord.splice(-2);

    if (mul > 1) {ord.push(pow, mul - 1);}
    if (pow > 0) {ord.push(pow - 1, num + 1);}
    return ord;
}

log(parse(expand([4,1,3,3], 3)));