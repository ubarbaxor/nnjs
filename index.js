// Computing stuff
require('./Array')
// const nj = require('numjs') // Fuck this
// const matrix = require('matrix-js') // fuck that too

// Helpers
const str = JSON.stringify // shameless

const aMax = a => Math.max(...a)
const aMin = a => Math.min(...a)
// let cached = require('ramda').memoize // And this

// Array shit
const nth = (n, a) => a ? a[n] : a => a[n]
const getCol = (n, a) => a ? a.map(nth(n)) : a => a.map(nth(n))
// const colMax = cached(aMax) // Fuck that also

// Math
const sigmoid = z => 1 / (1 + Math.pow(Math.E, z))

// Input
let X = [
  [3,5],
  [5,3],
  [10,2]
]
console.log('XMAP', X.mapDeep(console.log))
// console.log('XRED', X.reduceDeep((acc, val) => acc.concat(val)))
let y = [
  75,
  82,
  93
]

// Normalization matrices
const NX = [
  aMax(getCol(0, X)),
  aMax(getCol(1, X))
]
const Ny = 100

y2 = y.map(v => v / Ny)
X2 = X.map(
  row => row.map(
    (item, index) => item / NX[index]))

console.log(`
-------------------------Input:
  X: ${str(X)} ${str(X.detail())}
  y: ${str(y)} ${str(y.detail())}
-------------------------Normals:
  NX: ${str(NX)} ${str(NX.detail())}
  Ny: ${str(Ny)} ${str([].detail(Ny))}
-------------------------Normalized:
  X2: ${str(X2)}  y2: ${str(y2)}
-------------------------End.
`)

// Neural shit
const Neuron = (activation, ...synapses) => ({
  activation,
  synapses,
  get input(){ return R.sum(synapses) },
  get output(){ return this.activation(this.input) }
})
