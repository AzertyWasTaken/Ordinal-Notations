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
    ["ε0", limit],
]);

// Parse

export function parse(ord) {
    let offset = 0;
    return `:${ord.map((i) => {
        offset += i === 0 ? -1 : 1;
        return i === 0 ? ")" : "(";
    }).join("")}` +
    ")".repeat(offset);
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {
    return search(ord.slice(0, -1)) < 0;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] === 1;}
    }
    return a.length > b.length;
}

// Expansion

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++) {ord.push(...apps);}
    return ord;
}

export function getLimit(num) {return fill([], num, 1);}

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
    ord.pop();
    const root = search(ord);

    if (root >= 0) {
        const part = ord.slice(root);
        fill(ord, num, 0, ...part);
    }

    while (ord.at(-1) === 0) {ord.pop();}
    return ord;
}

// Test

log(parse(expand([1,1,1,0,1,0,1], 3)));