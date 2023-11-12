import {Point} from "../types";
import {distanceSquared} from "../utils/math-utils";

export class TransformationMatrix {

  /**
   *      a b c
   *      d e f
   *      0 0 1
   */
  public readonly values = {
    a: 1,
    b: 0,
    c: 0,
    d: 0,
    e: 1,
    f: 0,
  }

  public translate(x: number, y: number = x): this {
    const T = new TransformationMatrix()
      .set(1, 0, x, 0, 1, y,)
    return this.multiply(T)
  }

  public rotate(rad: number): this {
    const sin = Math.sin(rad)
    const cos = Math.cos(rad)
    const R = new TransformationMatrix()
      .set(cos, -sin, 0, sin, cos, 0)
    return this.multiply(R)
  }

  public set(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): this {
    this.values.a = a
    this.values.b = b
    this.values.c = c
    this.values.d = d
    this.values.e = e
    this.values.f = f
    return this
  }

  public setFromMatrix(A: TransformationMatrix): this {
    const B = this.getCopy(A)
    this.values.a = B.values.a
    this.values.b = B.values.b
    this.values.c = B.values.c
    this.values.d = B.values.d
    this.values.e = B.values.e
    this.values.f = B.values.f
    return this
  }

  public multiply(A: TransformationMatrix): this {
    const B = this.getCopy(this)
    this.values.a = A.values.a * B.values.a + A.values.b * B.values.d
    this.values.b = A.values.a * B.values.b + A.values.b * B.values.e
    this.values.c = A.values.a * B.values.c + A.values.b * B.values.f + A.values.c
    this.values.d = A.values.d * B.values.a + A.values.e * B.values.d
    this.values.e = A.values.d * B.values.b + A.values.e * B.values.e
    this.values.f = A.values.d * B.values.c + A.values.e * B.values.f + A.values.f
    return this
  }

  public getCopy(A: TransformationMatrix): TransformationMatrix {
    return new TransformationMatrix()
      .set(
        A.values.a,
        A.values.b,
        A.values.c,
        A.values.d,
        A.values.e,
        A.values.f,
      )
  }

  public transformPoint(point: Point): Point {
    return {
      x: this.values.a * point.x + this.values.b * point.y + this.values.c,
      y: this.values.d * point.x + this.values.e * point.y + this.values.f,
    }
  }

  public isClose(A: TransformationMatrix, positionEpsilon: number, rotationEpsilon: number): boolean {
    const thisPoint = {x: this.values.c, y: this.values.f}
    const aPoint = {x: A.values.c, y: A.values.f}

    return Math.abs(A.values.a - this.values.a) <= rotationEpsilon
      && Math.sqrt(distanceSquared(thisPoint,  aPoint)) <= positionEpsilon
  }
}