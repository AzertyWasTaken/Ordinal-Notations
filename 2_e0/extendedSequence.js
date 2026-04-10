"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,1]],
    ["ω^2", [0,1,1]],
    ["ω^ω", [0,1,2]],
    ["ω^ω^ω", [0,1,2,3]],
    ["ε0", [0,2]],
    ["ε1", [0,2,2]],
    ["εω", [0,2,3]],
    ["ζ0", [0,3]],
    ["φ(ω,0)", limit],
]);

// Parse

export function parse(ord) {return `(${ord.join(",")})`;}

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

export function getLimit(num) {return [0, num + 1];}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

function ascend(ord, offset) {
    for (let i = 0; i < ord.length; i++) {
        ord[i] += offset;
    }
    return ord;   
}

function search(ord, head) {
    let root = ord.length - 1;
    while (ord[root] >= head) {root--;}
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        const root = search(ord, head);
        const part = ord.slice(root);
        const offset = head - ord[root] - 1;

        fill(ord, num, () => ascend(part, offset));
    }
    return ord;
}

// Test

log(parse(expand([0,2,4,4], 3)));