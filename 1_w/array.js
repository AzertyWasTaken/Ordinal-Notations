"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [1]],
    ["ω", [1,0]],
    ["ω^2", [1,0,0]],
    ["ω^ω", limit],
]);

// Parse

export function parse(ord) {return `[${ord.join(",")}]`;}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-1) > 0;}

export function rank(a, b) {
    if (a.length !== b.length) {return a.length > b.length;}

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return false;
}

// Expansion

export function getLimit(num) {
    const ord = [1];
    for (let i = 0; i < num; i++) {ord.push(0);}
    return ord;
}

export function expand(ord, num) {
    let pos = ord.length - 1;
    while (ord[pos] === 0) {pos--;}

    if (pos + 1 < ord.length) {ord[pos + 1] = num + 1;}

    ord[pos]--;
    if (ord[0] === 0) {ord.shift();}
    return ord;
}

// Test

log(parse(expand([1,0,0,0], 3)));