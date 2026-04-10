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
    ["ε0", [0,1,3]],
    ["ε1", [0,1,3,3]],
    ["εω", [0,1,3,4]],
    ["ζ0", [0,1,3,5]],
    ["φ(ω,0)", [0,1,3,5,6]],
    ["Γ0", [0,1,3,5,7]],
    ["ψ(ε{Ω+1})", [0,1,3,6]],
    ["ψ(Ωω)", limit],
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

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

export function getLimit(num) {
    return fill([], num, (i) => [i * (i + 1) / 2]);
}

function ascend(ord, offset) {
    for (let i = 0; i < ord.length; i++) {
        ord[i] += offset;
    }
    return ord;   
}

function getParent(ord, head, root = ord.length) {
    do {root--;} while (ord[root] >= head);
    return root;
}

function search(ord, offset, root) {
    let mark = root;
    do {
        root = mark;
        mark = getParent(ord, ord[root], root);
    }
    while (ord[root] - ord[mark] >= offset);
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        const parent = getParent(ord, head);
        const type = head - ord[parent];

        const root = type > 1 ?
        search(ord, type, parent) : parent;

        const part = ord.slice(root);
        const offset = head - ord[root] - 1;

        fill(ord, num, () => ascend(part, offset));
    }
    return ord;
}

// Test

log(parse(expand([0,1,3,6,5,7], 3)));