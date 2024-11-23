import {TransformationMatrix} from "./transformations/transformation";
import {closestPointOnSegment, distanceSquared, distanceToSegment} from "./utils/math-utils";
import {getBoundingRectangle, getBoundingRectangleShapes} from "./utils/shape-utils";

export interface Point {
  x: number
  y: number
}

export type Vector = Point

export interface Distance {
  distanceToSegment: number
  vectorToSegment: Vector
  distanceToVertex: number
  vectorToVertex: Vector
}

export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
}

export class Triangle {

  public readonly size = 200
  public position: Point = {x: 0, y: 0}
  public rotation: number = 0
  public readonly transformation: TransformationMatrix = new TransformationMatrix()

  public getFinalTransformation(): TransformationMatrix {
    return new TransformationMatrix()
      .setFromMatrix(this.transformation)
      .rotate(this.rotation)
      .translate(this.position.x, this.position.y)
  }

}

export class Shape {

  public readonly transformation: TransformationMatrix = new TransformationMatrix()

  constructor(
    public position: Point,
    public rotation: number,
    public anchor: Point,
    public adaptVerticesForBorder: (borderWidth: number) => Array<Point>,
    public readonly vertices: Array<Point>,
    public readonly triangles: Array<Triangle>,
  ) {
  }

  public setPosition(p: Point): this {
    this.position = p
    return this
  }

  public setRotation(r: number): this {
    this.rotation = r
    return this
  }

  public getTransformedTriangles(): Array<TransformationMatrix> {

    this.triangles.forEach(triangle => {
      triangle.position = this.position
      triangle.rotation = this.rotation
    })
    return this.triangles.map(triangle => triangle.getFinalTransformation())
  }

  public getTransformedVertices(): Array<Point> {
    const rectangle = getBoundingRectangle(this.vertices)
    const transformationMatrix = new TransformationMatrix()
      .translate(-rectangle.width / 2, -rectangle.height / 2)
      .rotate(this.rotation * (Math.PI / 180))
      .translate(rectangle.width / 2, rectangle.height / 2)
      .translate(this.position.x, this.position.y)
    return this.vertices
      .map(vertex => transformationMatrix.transformPoint(vertex))
  }

  public sideDistancesToPoint(point: Point): Array<Distance> {
    return this.getTransformedVertices()
      .reduce((acc, curr, index, computedVertices) => {
        const next = computedVertices[(index + 1) % computedVertices.length]
        const closestPoint = closestPointOnSegment(point, curr, next)

        const distanceToVertex1 = Math.sqrt(distanceSquared(point, curr))
        const distanceToVertex2 = Math.sqrt(distanceSquared(point, next))

        return [...acc, {
          distanceToSegment: distanceToSegment(point, curr, next),
          vectorToSegment: {
            x: closestPoint.x - point.x,
            y: closestPoint.y - point.y,
          },
          distanceToVertex: distanceToVertex1 <= distanceToVertex2 ? distanceToVertex1 : distanceToVertex2,
          vectorToVertex: distanceToVertex1 <= distanceToVertex2
            ? {
              x: curr.x - point.x,
              y: curr.y - point.y,
            }
            : {
              x: next.x - point.x,
              y: next.y - point.y,
            },
        }]
      }, [] as Array<Distance>)
  }

  public distancesToShape(shape: Shape): Array<Distance> {
    return shape.getTransformedVertices()
      .reduce((acc, curr) => {
        return [
          ...acc,
          ...this.sideDistancesToPoint(curr),
        ]
      }, [] as Array<Distance>)
  }

}

export class Figure {

  constructor(
    public readonly polygons: Array<Array<Point>>, // Used for drawing
    public readonly shapes: Array<Shape>,   // Used for result evaluation
  ) {
  }

  public getTransformedTriangles(): Array<TransformationMatrix> {
    return this.shapesToTriangles(this.shapes)
  }

  public isSame(shapes: Array<Shape>): boolean {
    const shapeRectangle = getBoundingRectangleShapes(shapes)

    const figureTriangles = this.getTransformedTriangles()
    const shapeTriangles = this.shapesToTriangles(shapes)
      .map(triangle => triangle.translate(-shapeRectangle.x, -shapeRectangle.y))

    if (figureTriangles.length != shapeTriangles.length) {
      return false
    }

    for (let figureTriangle of figureTriangles) {
      let foundPair = false
      for (let shapeTriangle of shapeTriangles) {
        if (shapeTriangle.isClose(figureTriangle, 5, 0.05)) {
          foundPair = true
        }
      }
      if (!foundPair) {
        return false
      }
    }

    return true
  }

  private shapesToTriangles(shapes: Array<Shape>): Array<TransformationMatrix> {
    return shapes.reduce((acc, shape) => {
      return [...acc, ...shape.getTransformedTriangles()]
    }, [] as Array<TransformationMatrix>)
  }
}
