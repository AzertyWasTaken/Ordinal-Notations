"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", [0,0]],
    ["1", [0,1]],
    ["ω", [1,0]],
    ["ω^2", limit],
]);

// Parse

export function parse(ord) {
    return `[${ord[0]},${ord[1]}]`;
}

// Explorer

export function isZero(ord) {
    return ord[0] === 0 && ord[1] === 0;
}

export function isSucc(ord) {return ord[1] > 0;}

export function rank(a, b) {
    return a[0] !== b[0] ?
    a[0] > b[0] : a[1] > b[1];
}

// Expansion

export function getLimit(num) {return [num, 0];}

export function expand(ord, num) {
    if (ord[1] > 0) {
        ord[1]--;

    } else {
        ord[0]--;
        ord[1] = num;
    }
    return ord;
}

// Test

log(parse(expand([3,0], 3)));