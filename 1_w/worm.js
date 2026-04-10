"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [1]],
    ["ω^2", [2]],
    ["ω^ω", limit],
]);

// Parse

export function parse(ord) {
    return `(${ord.join(",")})`;
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-1) === 0;}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return a.length > b.length;
}

// Expansion

export function getLimit(num) {return [num];}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        for (let i = 0; i < num; i++) {ord.push(head - 1);}
    }
    return ord;
}

// Test

log(parse(expand([2,2], 3)));