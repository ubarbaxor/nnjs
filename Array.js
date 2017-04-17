Array.prototype.getDim = Array.prototype.getDim || function(a) {
  a = a || this
  return Array.isArray(a)
    ? Array.isArray(a[0])
      ? 1 + a[0].getDim()
      : 1
    : 0
}
Array.prototype.getShape = Array.prototype.getShape || function(a) {
  a = a || this
  const length = Array.isArray(a) && a.length
  return length
    ? Array.isArray(a[0])
      ? [length].concat(a[0].getShape())
      : [length]
    : []
}
Array.prototype.reduceDeep = Array.prototype.reduceDeep || function(f, a, init=[]) {
  a = a || this
  return Array.isArray(a)
    ? a.reduce(a.reduceDeep, init)
    : f(init, a)
}
Array.prototype.mapDeep = Array.prototype.mapDeep || function(f, a, depth=0, maxDepth) {
  a = a || this
  maxDepth = maxDepth || [].getDim(a)
  console.log('mapDeep', depth, maxDepth, a)
  if (depth > maxDepth + 2) { console.error('Oh shit'); return a }
  if (Array.isArray(a)) {
    return a.map(x => a.mapDeep(f, x, 1 + depth, maxDepth))
  } else {
    return f(a)
  }
}
Object.defineProperty(
  Array.prototype, 'isRegular', { // add [].isRegular getter
    get: function() {
      const deep = Array.isArray(this[0])
      const dimLength = deep && this[0].length
      // now we know this dimension is regular.
      return this.every(
        x => Array.isArray(x) === deep && (!deep || x.length == dimLength)
      )
    }})
Array.prototype.detail = Array.prototype.detail || function() {
    return ({
      dimension: this.getDim(),
      regular: this.isRegular,
      shape: this.getShape(),
    })}
