"use strict";
import {log} from "../log.js";
import {limit} from "../utils.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [1]],
    ["ω^2", [1,1]],
    ["ω^ω", limit],
]);

// Parse

export function parse(ord) {return `(${ord.join(",")})`;}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-1) === 0;}

function maxSepPos(ord) {
    for (let i = ord.length - 1; i >= 0; i--) {
        if (ord[i] === 1) {return i;}
    }
    return ord.length - 1;
}

function compare(a, b) {
    if (a.length !== b.length) {return false;}

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {return false;}
    }
    return true;
}

export function rank(a, b) {
    if (a.length === 0) {return false;}
    if (b.length === 0) {return true;}

    const [pa, pb] = [maxSepPos(a), maxSepPos(b)];
    if (a[pa] !== b[pb]) {return a[pa] === 1;}

    const [la, lb] = [a.slice(0, pa), b.slice(0, pb)];
    if (!compare(la, lb)) {return rank(la, lb);}

    return rank(a.slice(pa + 1), b.slice(pb + 1));
}

// Expansion

function fill(num, val) {
    const arr = [];
    for (let i = 0; i < num; i++) {arr.push(val);}
    return arr;
}

export function getLimit(num) {return fill(num, 1);}

function search(ord) {
    let root = ord.length - 1;
    while (ord[root] === 1) {root--;}
    return root;
}

export function expand(ord, num) {
    if (ord.at(-1) === 0) {
        ord.pop();

    } else {
        const root = search(ord);
        ord.splice(root, 1);
        ord.splice(root + 1, 0, ...fill(num, 0));
    }
    return ord;
}

// Test

log(parse(expand([0,1,0,1,1], 3)));