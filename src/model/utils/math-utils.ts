import {Point} from "../types";

export function distanceSquared(v: Point, w: Point) {
  return Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2)
}

function distanceToSegmentSquared(p: Point, v: Point, w: Point) {
  const l2 = distanceSquared(v, w);
  if (l2 == 0) return distanceSquared(p, v);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return distanceSquared(p, {
    x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y),
  });
}

export function distanceToSegment(p: Point, v: Point, w: Point) {
  return Math.sqrt(distanceToSegmentSquared(p, v, w));
}

export function closestPointOnSegment(p: Point, a: Point, b: Point): Point {
  const v = {x: b.x - a.x, y: b.y - a.y}
  const u = {x: a.x - p.x, y: a.y - p.y}
  const vu = v.x * u.x + v.y * u.y
  const vv = v.x ** 2 + v.y ** 2
  const t = -vu / vv
  if (t >= 0 && t <= 1) return vectorToSegment(t, {x: 0, y: 0}, a, b)
  const g0 = sqDiag(vectorToSegment(0, p, a, b))
  const g1 = sqDiag(vectorToSegment(1, p, a, b))
  return g0 <= g1 ? a : b
}

function vectorToSegment(t: number, p: Point, a: Point, b: Point): Point {
  return {
    x: (1 - t) * a.x + t * b.x - p.x,
    y: (1 - t) * a.y + t * b.y - p.y,
  }
}

function sqDiag(p: Point) {
  return p.x ** 2 + p.y ** 2
}