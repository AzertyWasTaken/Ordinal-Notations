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
    ["ε0", limit],
]);

// Parse

export function parse(ord) {return `:${ord.join("")}`;}

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
    return fill([], num, (i) => fill([0], i, () => [1]));
}

function getParent(ord, root = ord.length) {
    do {root--;} while (ord[root] === 1);
    return root;
}

function search(ord, head, root) {
    let mark = ord.length;
    do {
        root = mark;
        mark = getParent(ord, mark);
    }
    while (root - mark - 1 >= head);
    return mark;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        ord.push(head);
        const top = ord.splice(getParent(ord));
        const part = ord.slice(search(ord, top.length - 1));
        fill(ord, num, () => part);
    }
    return ord;
}

// Test

log(parse(expand([0,0,1,0,1,1,0,1,1,1,0,1,1], 3)));