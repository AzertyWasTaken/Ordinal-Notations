"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,0]],
    ["ω", [0,1,1,0]],
    ["ω^2", [0,1,1,2,2,0]],
    ["ω^ω", [0,1,2,2,1,0]],
    ["ω^ω^ω", [0,1,2,3,3,2,1,0]],
    ["ε0", limit],
]);

// Unparse

export function unparse(ord) {return `(${ord.join(",")})`;}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {
    return ord.length > 0 && ord.at(-1) === ord.at(-2);
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return a.length > b.length;
}

// Expansion

function fill(num, func) {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(...func(i));
    }
    return arr;
}

export function getLimit(num) {
    return [
        ...fill(num, (i) => [i]),
        ...fill(num, (i) => [num - i - 1])
    ];
}

function ascend(ord) {
    for (let i = 0; i < ord.length; i++) {ord[i]++;}
    return ord;
}

function getHead(ord) {
    let root = ord.length - 1;
    while (ord[root] !== ord[root + 1]) {root--;}
    return root;
}

function search(ord, head, root) {
    while (ord[root] > head) {root--;}
    return root;
}

export function expand(ord, num) {
    const pos = getHead(ord);
    ord.splice(pos, 2);

    if (pos < ord.length) {
        const root = search(ord, ord[pos], pos - 1);
        const part = ord.slice(root, pos + 1);

        ord.splice(pos + 1, 0,
            ...fill(num, () => ascend(part)));
    }
    return ord;
}

// Test

log(unparse(expand([0,1,2,2,3,3,1,0], 3)));