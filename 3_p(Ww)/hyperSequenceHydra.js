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
    ["ψ(Ωω)", [1,2,4]],
    ["ψ(Λ)", [1,2,4,4,3,0,0,1]],
    ["ψ(Iω)", [1,2,4,4,4]],
    ["ψ(I(ω,0))", [1,2,4,4,4,0,1]],
    ["ψ(ε{M+1})", [1,2,4,4,4,0,3,4]],
    ["ψ(Mω)", [1,2,4,4,4,0,4]],
    ["ψ(M(ω;0))", [1,2,4,4,4,1]],
    ["ψ(Kω)", [1,2,4,4,4,4]],
    ["ψ(ε{T+1})", [1,2,4,5]],
    ["ψ(Tω)", [1,2,4,6]],
    ["ψ(T[ω])", [1,2,4,6,1]],
    ["ψ(T[1:;0]ω)", [1,2,4,6,6]],
    ["ψ(T[1:;;0]ω)", [1,2,4,6,8]],
    ["ψ(T[1:{ω}0]ω)", [1,2,4,7]],
    ["ψ(T[1{1{*ω}0}0])", [1,2,4,7,10]],
    ["ψ(T[1[ω[[1]]0]0])", [1,2,4,7,11]],
    ["ψ(T[1[0]<ω>0])", limit],
]);

// Unparse

function genHydra(ord, func) {
    let offset = 0;
    return `:${ord.map((i) => {
        offset += i === 0 ? -1 : 1;
        return func(i);
    }).join("")}` +
    ")".repeat(offset);
}

export function unparse(ord) {
    return genHydra(ord, (i) => i === 0 ? ")" : `(${i - 1}`);
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

export function getLimit(num) {return [1, num + 2];}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

function ascend(ord, offset, ascendMap) {
    for (let i = 0; i < ord.length; i++) {
        if (ascendMap[i]) {ord[i] += offset;}
    }
    return ord;   
}

function getAscendMap(ord, head) {
    const result = [true];
    let count = 0;

    for (let i = 1; i < ord.length; i++) {
        if (count > 0) {count += ord[i] === 0 ? -1 : 1;}
        if (ord[i] > 0 && ord[i] <= ord[0]) {count = 1;}

        result.push(count === 0 && ord[i] !== 0);
    }
    return result;
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

function getSubParent(ord, head, root) {
    while (ord[root] >= head) {
        root = getParent(ord, root);
    }
    return root;
}

function search(ord, offset, root) {
    let mark = root;
    do {
        root = mark;
        mark = getSubParent(ord, ord[root], root);
    }
    while (ord[root] - ord[mark] >= offset);
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();
    const parent = getParent(ord);

    if (parent >= 0) {
        if (head === 1) {
            const part = ord.slice(parent);
            part.unshift(0);

            fill(ord, num, () => part);

        } else {
            const parent2 = getSubParent(ord, head, parent);
            const type = head - ord[parent2];

            const root = type > 1 ?
            search(ord, type, parent2) : parent2;

            const part = ord.slice(root);
            const offset = head - ord[root] - 1;
            const ascendMap = getAscendMap(part, head);

            fill(ord, num, () => ascend(part, offset, ascendMap));
        }
    }

    while (ord.at(-1) === 0) {ord.pop();}
    return ord;
}

// Test

log(unparse(expand([1,2,4,6,2,0,0,0,6], 3)));