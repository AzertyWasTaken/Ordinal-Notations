"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [2]],
    ["ω", [2,1,2]],
    ["ω^2", [2,1,2,0,2]],
    ["ω^ω", [2,1,2,1,2]],
    ["ω^ω^ω", [2,1,2,1,2,1,2]],
    ["ε0", [2,2]],
    ["ε1", [2,2,0,2]],
    ["εω", [2,2,1,1,2]],
    ["ζ0", [2,2,1,2]],
    ["φ(ω,0)", [2,2,1,2,1,1,2]],
    ["Γ0", [2,2,1,2,1,2]],
    ["ψ(ε{Ω+1})", [2,2,2]],
    ["ψ(Ωω)", limit],
]);

// Parse

export function parse(ord) {
    return `:${ord.map((i) =>
        i === 0 ? ")" : i === 1 ? "}" : "0"
    ).join("")}`;
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {
    return getParent(ord.slice(0, -1)) < 0;
}

export function rank(a, b) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] !== b[i]) {return a[i] === 1;}
    }
    return a.length > b.length;
}

// Expansion

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++) {
        ord.push(...apps);
    }
    return ord;
}

export function getLimit(num) {
    return fill([], num, 2);
}

function trim(ord, func) {
    while (func(ord.at(-1))) {ord.pop();}
    return ord;
}

function getParent(ord, root = ord.length) {
    let count = 1;
    do {
        root--;
        if (ord[root] === 0) {count++;}
        else if (ord[root] === 2) {count--;}
    }
    while (root >= 0 && count > 0);
    return root;
}

function search(ord) {
    let root = ord.length;
    let count = 1;
    do {
        root--;
        if (ord[root] === 1) {count++;}
        else if (ord[root] === 2) {count--;}

        if (ord[root] === 0) {
            root = getParent(ord, root);
        }
    }
    while (root >= 0 && count > 0);
    return root;
}

export function expand(ord, num) {
    ord.pop();
    const root = getParent(ord);

    if (root >= 0) {
        const root2 = search(ord);

        if (root2 >= 0) {
            fill(ord, num, 1, ...ord.slice(root2));

        } else {
            trim(ord, (i) => i === 1);
            fill(ord, num, 0, ...ord.slice(root));
        }
    }

    return trim(ord, (i) => i !== 2);
}

log(parse(expand([2,2,1,1,2,0,2], 3)));