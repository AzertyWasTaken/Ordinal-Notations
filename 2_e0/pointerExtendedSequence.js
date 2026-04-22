"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,0]],
    ["ω", [0,0,0,0]],
    ["ω^2", [0,0,0,0,1,0]],
    ["ω^ω", [0,0,0,0,0,0]],
    ["ω^ω^ω", [0,0,0,0,0,0,0,0]],
    ["ε0", [0,0,0,1]],
    ["ε1", [0,0,0,1,1,1]],
    ["εω", [0,0,0,1,0,0]],
    ["ζ0", [0,0,0,2]],
    ["φ(ω,0)", limit],
]);

// Unparse

export function unparse(ord) {
    let str = "";
    for (let i = 0; i < ord.length; i += 2) {
        str += `[${ord[i]},${ord[i + 1]}]`
    }
    return str;
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {
    return ord.at(-2) === ord.length / 2 - 1;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i += 2) {
        if (a[i] !== b[i]) {return a[i] < b[i];}
        if (a[i + 1] !== b[i + 1]) {return a[i + 1] > b[i + 1];}
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
    return [0, 0, 0, num];
}

export function expand(ord, num) {
    const [head, label] = ord.splice(-2);
    const root = ord.length - head * 2 - 2;

    if (root >= 0) {
        const part = ord.slice(root);

        fill(ord, num, () => {
            if (label === 0) {part[0] += head + 1;}
            else {part.splice(0, 2, head, label - 1);}
            return part;
        });
    }
    return ord;
}

// Test

log(unparse(expand([0,0,0,2,1,2,2,2], 3)));