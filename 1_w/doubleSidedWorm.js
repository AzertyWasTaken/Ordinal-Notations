"use strict";
import {log} from "../log.js";
import {limit} from "../utils.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [1]],
    ["ω^2", [1,1]],
    ["ω^ω", [2]],
    ["ω^ω^ω", limit],
]);

// Parse

export function parse(ord) {return `(${ord.join(",")})`;}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-1) === 0;}

function maxSepPos(ord) {
    let rec = ord.length - 1;
    for (let i = ord.length - 2; i >= 0; i--) {
        if (ord[i] > ord[rec]) {rec = i;}
    }
    return rec;
}

function compare(a, b) {
    if (a.length !== b.length) {return false;}

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {return false;}
    }
    return true;
}

export function rank(a, b) {
    while (true) {
        if (a.length === 0) {return false;}
        if (b.length === 0) {return true;}

        const [pa, pb] = [maxSepPos(a), maxSepPos(b)];
        if (a[pa] !== b[pb]) {return a[pa] > b[pb];}

        const [la, lb] = [a.slice(0, pa), b.slice(0, pb)];
        [a, b] = compare(la, lb) ?
        [a.slice(pa + 1), b.slice(pb + 1)] :
        [la, lb];
    }
}

// Expansion

function fill(num, val) {
    const arr = [];
    for (let i = 0; i < num; i++) {arr.push(val);}
    return arr;
}

export function getLimit(num) {return [num];}

function search(ord) {
    let root = ord.length - 1;
    while (
        ord[root - 1] > 0 &&
        ord[root - 1] <= ord[root]
    ) {
        root--;
    }
    return root;
}

export function expand(ord, num) {
    if (ord.at(-1) === 0) {
        ord.pop();

    } else {
        const root = search(ord);
        const number = ord[root];

        ord.splice(ord[root - 1] === 0 ? root - 1 : root, 1);
        ord.splice(root, 0, ...fill(num, Math.max(number - 1, 0)));
    }
    return ord;
}

// Test

log(parse(expand([0,0,2,3,3], 3)));