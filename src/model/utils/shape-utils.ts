import {Point, Rectangle, Shape} from "../types";

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

export function getBoundingRectangleShapes(shapes: Array<Shape>): Rectangle {

  const rectangles = shapes.reduce((acc, curr) => {
    return [
      ...acc,
      getBoundingRectangle(curr.getTransformedVertices()),
    ]
  }, [] as Array<Rectangle>)

  let minX = rectangles[0].x
  let maxX = rectangles[0].width
  let minY = rectangles[0].y
  let maxY = rectangles[0].height


  rectangles.forEach(rectangle => {
    minX = Math.min(minX, rectangle.x)
    maxX = Math.max(maxX, rectangle.width)
    minY = Math.min(minY, rectangle.y)
    maxY = Math.max(maxY, rectangle.height)
  })

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  }

}