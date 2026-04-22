"use strict";
import {limit} from "../utils.js";
import {fixModule} from "../ordModule.js";
import {log} from "../log.js";

export function* createLngi(mod, maxLength, start, end, offset) {
    const sModule = fixModule(mod);

    function* expand(ord, len, lowerBound) {
        const succ = sModule.isSucc(ord);
        if ((succ && lowerBound !== undefined) || sModule.isZero(ord)) {return;}

        let first;
        let counter = 0;
        let children = 0;

        let newLength = len;

        function* nextOrd() {
            if ((succ && counter > 0) || newLength < 1) {return;}

            const newOrd = sModule.expand(ord, counter);
            counter++;

            if (first || sModule.rank(newOrd, lowerBound)) {
                children++;
                newLength = len - offset(children);

                yield* expand(newOrd, newLength, first ?? lowerBound);

                yield {type: "entry", ord: newOrd, str: sModule.unparse};
                first = newOrd;

            } else if (counter > 4) {
                yield {type: "error", prev: lowerBound, curr: newOrd, next: ord, str: sModule.unparse};
                return;
            }

            yield* nextOrd();
        }

        yield* nextOrd();
    }

    yield* expand(end, maxLength, start);

    yield {type: "entry", ord: limit, str: sModule.unparse};
}