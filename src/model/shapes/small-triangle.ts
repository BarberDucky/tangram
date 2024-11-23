import { Shape, Triangle } from "../types";

const SMALL_TRIANGLE = () => {
  const t1 = new Triangle()

  return [t1]
}

export const SmallTriangleShape = () => {
  return new Shape(
    { x: 0, y: 0 },
    0,
    { x: 0, y: 0 },
    getBorderAdaptedSmallTriangle,
    [
      { x: 0, y: 0 },
      { x: 200, y: 0 },
      { x: 0, y: 200 },
    ],
    SMALL_TRIANGLE(),
  )
}

function getBorderAdaptedSmallTriangle(borderWidth: number) {
  const miterLength = borderWidth / 2 / Math.sin(Math.PI / 4)

  return [
    { x: 0 + borderWidth / 2, y: 0 + borderWidth / 2 },
    { x: 200 - borderWidth / 2 - miterLength, y: 0 + borderWidth / 2 },
    { x: 0 + borderWidth / 2, y: 200 - borderWidth / 2 - miterLength },
  ]
}