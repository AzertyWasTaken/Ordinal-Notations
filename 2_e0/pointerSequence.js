"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,0]],
    ["ω^2", [0,0,1]],
    ["ω^ω", [0,0,0]],
    ["ω^ω^ω", [0,0,0,0]],
    ["ε0", limit],
]);

// Parse

export function parse(ord) {return `(${ord.join(",")})`;}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {
    return ord.at(-1) >= ord.length - 1;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] < b[i];}
    }
    return a.length > b.length;
}

// Expansion

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

export function getLimit(num) {
    return fill([], num, () => [0]);
}

export function expand(ord, num) {
    const head = ord.pop();
    const root = ord.length - head - 1;

    if (root >= 0) {
        const part = ord.slice(root);

        fill(ord, num, () => {
            part[0] += head + 1;
            return part;
        });
    }
    return ord;
}

// Test

log(parse(expand([0,0,0,1,2], 3)));