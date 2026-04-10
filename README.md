# About

A collection of ordinal notations expansion scripts.  
Each notation script contains these functions:

| Name | Description
| - | -
| milestones | A map containing milestones analysis
| parse(ord) | Parse *ord* into a string and possibly add syntaxic sugar
| isSucc(ord) | Return if *ord* is a successor
| rank(a, b) | Return if *a* is strictly above *b*
| getLimit(num) | Get the *num*-th term of the fundamental sequence of the notation limit
| expand(ord, num) | Get the *num*-th term of the fundamental sequence of *ord*

Each script also imports functions from `utils.js` and has a test log.  
The lenght of a script is the number of nonempty lines in the explorer and expansion sections.

# Rules

## Modules

### Coding

- Internal structure must be an array containing **only** natural numbers
- **No** iterative object methods inside explorer and expansion sections
- Expansion function must mutate *ord*
- Time complexity must be optimal
- Parsed notations must **not** contain spaces
- Ignore zero expansion
- **No** recursion
- Split long functions

### Formatting

- Each line must have **at most** 64 characters
- Functions and statements followed by braces must **not** break line
- Arrow functions must be function arguments
- Each function must **not** nest while and for loops
- Merge similar functions
- Write shorthands for frequently used variables
- Avoid more than 64 characters per line
- Each instruction must end with a semicolon

## Accepted notations

- **Not** overcomplicated
- Must append and pop at the right
- Skip notations with similar expansion
- Avoid weak trivial extentions

## Creating notations

- Extend limit
- Compress length
- Map down
- Simplify expansion

# Dictionary

## Notations

| Name | Definition |
| - | - |
| address | Each item encodes its parent position
| array | Array with fixed length
| binary | Uses only two symbols
| double sided | Can expand in both sides
| hyper | Meta sequence property
| index | Uses a pair to represent a number index
| number | Unbounded symbols count
| pair | Each items has a pair
| pointer | Each item encodes its distance with its parent
| sequence | Equivalent to nested worm or tree
| unary | Uses only a single symbol
| worm | Array with variable length

## Variables

| Name | Definition
| - | -
| a, b | Used in binary operations
| func | Function
| head | Last item of a sequence
| num | Integer
| offset | Value difference between two sequence items
| ord | Ordinal
| parent | Parent of a sequence head
| part | Slice from the root to the end of a sequence
| root | Root of a sequence
| top | Last item of a head
| type | Uncountable level

## Functions

| Name | Definition
| - | -
| `fill(ord, num, val)` | Push *val* to *ord* *num* times
| `getParent(ord, root)` | Search the parent of *root* item of *ord*
| `search(ord)` | Search the root of an array
| `trim(ord, func)` | Trim the end of a sequence

# Notations complexity

## General

The complexity is the tokens count in the expansion and limit sections.

| Ordinal | Notation | Complexity
| - | - | -
| ω | number | 30
| ω | unaryWorm | 60
| ω^2 | pairNumber | 60
| ω^ω | worm | 70
| ω^ω | indexArray | 105
| ω^ω | array | 125
| ω^ω | binaryArray | 160
| ω^ω^ω | doubleSidedWorm | 200
| ε0 | pointerSequence | 140
| ε0 | shortSequence | 150
| ε0 | sequence | 160
| ε0 | addressSequence | 165
| ε0 | hydra | 190
| ε0 | binaryShiftedSequence | 240
| εω | wormSequence | 200
| εω | wormHydra | 210
| φ(ω,0) | extendedSequence | 210
| Γ0 | shiftedSequence | 335
| ψ(Ωω) | sequenceHydra | 270
| ψ(Ωω) | pointerPairSequence | 300
| ψ(Ωω) | hyperSequence | 310
| ψ(Ωω) | pairSequence | 320
| ψ(Ωω) | hyperHydra | 385

## Milestones

| Milestone | Notation | Complexity
| - | - | -
| ω | number | 30
| ω^ω | worm | 70
| ε0 | pointerSequence | 140
| φ(ω,0) | extendedSequence | 210
| ψ(Ωω) | sequenceHydra | 270