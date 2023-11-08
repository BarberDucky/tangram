import {closestPointOnSegment, distanceSquared, distanceToSegment} from "./math-utils";

describe('distance squared', () => {
  it('works', () => {
    const a = {x: 0, y: 0}
    const b = {x: 3, y: 4}
    const c = {x: -3, y: -4}
    expect(distanceSquared(a, b)).toBe(25)
    expect(distanceSquared(a, c)).toBe(25)
  })
})

describe('distance to segment', () => {
  it('works for point on segment', () => {
    const p0 = {x: 0, y: 0}
    const a = {x: 3, y: 4}
    const b = {x: -3, y: -4}
    expect(distanceToSegment(p0, a, b)).toBe(0)
  })

  it('works from point to segment', () => {
    const p0 = {x: 3, y: 2}
    const p1 = {x: 3, y: -2}
    const a = {x: 0, y: 0}
    const b = {x: 6, y: 0}
    expect(distanceToSegment(p0, a, b)).toBe(2)
    expect(distanceToSegment(p1, a, b)).toBe(2)
  })

  it('works from point to segment vertex', () => {
    const p0 = {x: 3, y: 4}
    const a = {x: 0, y: 0}
    const b = {x: -3, y: -4}
    expect(distanceToSegment(p0, a, b)).toBe(5)
  })
})

describe('closestPointOnSegment', () => {
  it('works for point on segment', () => {
    const p0 = {x: 0, y: 0}
    const a = {x: 3, y: 4}
    const b = {x: -3, y: -4}
    expect(closestPointOnSegment(p0, a, b)).toStrictEqual({x: 0, y: 0})
  })

  it('works from point to segment', () => {
    const p0 = {x: 3, y: 2}
    const p1 = {x: 3, y: -2}
    const a = {x: 0, y: 0}
    const b = {x: 6, y: 0}
    expect(closestPointOnSegment(p0, a, b)).toStrictEqual({x: 3, y: 0})
    expect(closestPointOnSegment(p1, a, b)).toStrictEqual({x: 3, y: 0})
  })

  it('works from point to segment vertex', () => {
    const p0 = {x: 3, y: 4}
    const p1 = {x: -6, y: -8}
    const a = {x: 0, y: 0}
    const b = {x: -3, y: -4}
    expect(closestPointOnSegment(p0, a, b)).toStrictEqual({x: 0, y: 0})
    expect(closestPointOnSegment(p1, a, b)).toStrictEqual({x: -3, y: -4})
  })
})