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
    ["ε0", [1,2]],
    ["ε1", [1,2,0,2]],
    ["εω", [1,2,1]],
    ["ζ0", [1,2,2]],
    ["φ(ω,0)", [1,2,2,1]],
    ["Γ0", [1,2,2,2]],
    ["ψ(ε{Ω+1})", [1,2,3]],
    ["ψ(Ωω)", limit],
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
    return getParent(ord.slice(0, -1)) < 0;
}

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
    return fill([], num, (i) => [i + 1]);
}

function getParent(ord, root = ord.length) {
    let count = 1;
    do {
        root--;
        count += ord[root] === 0 ? 1 : -1;
    }
    while (root >= 0 && count > 0);
    return root;
}

function search(ord, head, root) {
    while (ord[root] >= head) {
        root = getParent(ord, root);
    }
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();
    const parent = getParent(ord);

    if (parent >= 0) {
        const root = head > 1 ?
        search(ord, head, parent) : parent;

        const part = ord.slice(root);
        if (head === 1) {part.unshift(0);}
        fill(ord, num, () => part);
    }

    while (ord.at(-1) === 0) {ord.pop();}
    return ord;
}

// Test

log(parse(expand([1,2,3,0,2,2], 3)));