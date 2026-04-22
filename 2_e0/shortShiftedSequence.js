"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,0,1]],
    ["ω^2", [0,0,1,0,1]],
    ["ω^ω", [0,0,1,0,1,1]],
    ["ω^ω^ω", [0,0,1,0,1,1,0,1,1,1]],
    ["ε0", [0,0,2]],
    ["ε1", [0,0,2,0,2]],
    ["εω", [0,0,2,1]],
    ["ζ0", [0,0,2,1,2]],
    ["φ(ω,0)", [0,0,2,2]],
    ["Γ0", limit],
]);

// Unparse

export function unparse(ord) {return `(${ord.join(",")})`;}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-1) === 0;}

// Expansion

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return a.length > b.length;
}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

export function getLimit(num) {return [0, 0, num + 1];}

function getParent(ord, head, root = ord.length) {
    do {root--;} while (ord[root] >= head);
    return root;
}

function search(ord, head, top, root) {
    let mark = ord.length;
    do {
        root = mark;
        mark = getParent(ord, top, mark);
    }
    while (!rank(head, ord.slice(mark, root)));
    return [mark, root];
}

export function expand(ord, num) {
    const top = ord.pop();

    if (top > 0) {
        const head = ord.splice(getParent(ord, top));

        if (top - head[0] >= 2) {
            ord.push(...head);
            head[0] = top - 1;
            fill(ord, num, () => head);

        } else {
            head.push(top);
            const [mark, root] = search(ord, head, top);

            const part = top - ord[mark] > 1 ?
            ord.slice(mark).toSpliced(0, 1, top - 1) :
            ord.slice(root);

            head.pop();
            part.unshift(...head);
            fill(ord, num, () => part);
        }
    }
    return ord;
}

// Test

log(unparse(expand([0,0,3,3,2,3,3], 3)));