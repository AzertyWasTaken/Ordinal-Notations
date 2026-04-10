"use strict";
export const DEFAULT_CATEGORY = "1_w";
export const DEFAULT_NOTATION = "number";

export const NOTATIONS = {
    "1_w": {
        "number": {name: "Number"},
        "unaryWorm": {name: "Unary Worm"},

        "pairNumber": {name: "Pair Number"},

        "worm": {name: "Worm"},
        "indexArray": {name: "Index Array"},
        "array": {name: "Array"},
        "binaryArray": {name: "Binary Array"},

        "doubleSidedWorm": {name: "Double Sided Worm"},
    },

    "2_e0": {
        "pointerSequence": {name: "Pointer Sequence"},
        "shortSequence": {name: "Short Sequence"},
        "sequence": {name: "Sequence"},
        "addressSequence": {name: "Address Sequence"},
        "hydra": {name: "Hydra"},
        "binaryShiftedSequence": {name: "Binary Shifted Sequence"},

        "wormSequence": {name: "Worm Sequence"},
        "wormHydra": {name: "Worm Hydra"},

        "extendedSequence": {name: "Extended Sequence"},

        "shiftedSequence": {name: "Shifted Sequence"},
    },

    "3_p(Ww)": {
        "sequenceHydra": {name: "Sequence Hydra"},
        "pointerPairSequence": {name: "Pointer Pair Sequence"},
        "hyperSequence": {name: "Hyper Sequence"},
        "pairSequence": {name: "Pair Sequence"},
        "hyperHydra": {name: "Hyper Hydra"},
    }
};