"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", limit],
]);

// Parse

export function parse(ord) {
    return `:${"0".repeat(ord.length)}`;
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-1) === 0;}

export function rank(a, b) {return a.length > b.length;}

// Expansion

export function getLimit(num) {
    const ord = [];
    for (let i = 0; i < num; i++) {ord.push(0);}
    return ord;
}

export function expand(ord, num) {
    ord.pop();
    return ord;
}

// Test

log(parse(expand([0,0,0], 3)));