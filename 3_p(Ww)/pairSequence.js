"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,0]],
    ["ω", [0,0,1,0]],
    ["ω^2", [0,0,1,0,1,0]],
    ["ω^ω", [0,0,1,0,2,0]],
    ["ω^ω^ω", [0,0,1,0,2,0,3,0]],
    ["ε0", [0,0,1,1]],
    ["ε1", [0,0,1,1,1,1]],
    ["εω", [0,0,1,1,2,0]],
    ["ζ0", [0,0,1,1,2,1]],
    ["φ(ω,0)", [0,0,1,1,2,1,3,0]],
    ["Γ0", [0,0,1,1,2,1,3,1]],
    ["ψ(ε{Ω+1})", [0,0,1,1,2,2]],
    ["ψ(Ωω)", limit],
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
    return fill([], num, (i) => [i, i]);
}

function ascend(ord, offset) {
    for (let i = 0; i < ord.length; i += 2) {
        ord[i] += offset;
    }
    return ord;
}

function getParent(ord, head, root = ord.length) {
    do {root -= 2;} while (ord[root] >= head);
    return root;
}

function search(ord, type) {
    let root = ord.length;
    do {root = getParent(ord, ord[root], root);}
    while (ord[root + 1] >= type);
    return root;
}

export function expand(ord, num) {
    const [head, type] = ord.splice(-2);

    if (head > 0) {
        const root = type > 0 ?
        search(ord, type) : getParent(ord, head);

        const offset = type > 0 ?
        head - ord[root] : 0;

        const part = ord.slice(root);
        fill(ord, num, () => ascend(part, offset));
    }
    return ord;
}

log(parse(expand([0,0,1,1,2,2,2,2], 3)));