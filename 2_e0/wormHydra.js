"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [1]],
    ["ω", [1,1]],
    ["ω^2", [1,1,0,1]],
    ["ω^ω", [1,1,1]],
    ["ω^ω^ω", [1,1,1,1]],
    ["ε0", [2]],
    ["ε1", [3]],
    ["εω", limit],
]);

// Parse

export function parse(ord) {
    return `:${ord.map((i) =>
        i === 0 ? ")" : i - 1
    ).join("")}`;
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {
    return ord.at(-1) === 1 &&
    search(ord.slice(0, -1)) < 0;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return a.length > b.length;
}

// Expansion

export function getLimit(num) {return [num + 1];}

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++) {
        ord.push(...apps);
    }
    return ord;
}

function search(ord) {
    let root = ord.length;
    let count = 1;
    do {
        root--;
        count += ord[root] === 0 ? 1 : -1;
    }
    while (root >= 0 && count > 0);
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 1) {
        fill(ord, num, head - 1);

    } else {
        const root = search(ord);

        if (root >= 0) {
            const part = ord.slice(root);
            fill(ord, num, 0, ...part);
        }
    }

    while (ord.at(-1) === 0) {ord.pop();}
    return ord;
}

// Test

log(parse(expand([3,2,0,2], 3)));