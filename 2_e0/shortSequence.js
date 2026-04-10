"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,1]],
    ["ω^2", [0,1,1]],
    ["ω^ω", [0,2]],
    ["ω^ω^ω", [0,3]],
    ["ε0", limit],
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

export function getLimit(num) {return [0, num];}

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++) {
        ord.push(...apps);
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
        const part = ord.slice(search(ord, head));
        part[0] = head - 1;

        fill(ord, num, ...part);
    }
    return ord;
}

// Test

log(parse(expand([0,3,3,3], 3)));