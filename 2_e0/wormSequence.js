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
    ["ε1", [0,3]],
    ["εω", limit],
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

function search(ord, head) {
    let root = ord.length - 1;
    while (ord[root] >= head) {root--;}
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        const root = search(ord, head);
        const offset = head - ord[root] - 1;

        if (offset > 0) {
            fill(ord, num, (i) =>
                [ord[root] + offset * (i + 1)]);

        } else {
            fill(ord, num, () => ord.slice(root));
        }
    }
    return ord;
}

// Test

log(parse(expand([0,2,4,4], 3)));