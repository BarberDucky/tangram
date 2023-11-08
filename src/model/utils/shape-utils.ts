import {Point, Rectangle} from "../types";

export function generatePolygonString(points: Array<Point>): string {
  return points
    .map(point => `${point.x},${point.y}`)
    .join(' ')
}

export function getBoundingRectangle(points: Array<Point>): Rectangle {

  let minX = points[0].x
  let maxX = points[0].x
  let minY = points[0].y
  let maxY = points[0].y


  points.forEach(point => {
    minX = Math.min(minX, point.x)
    maxX = Math.max(maxX, point.x)
    minY = Math.min(minY, point.y)
    maxY = Math.max(maxY, point.y)
  })

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }
}