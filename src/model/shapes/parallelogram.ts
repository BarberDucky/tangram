import { Shape, Triangle } from "../types";

const PARALLELOGRAM = () => {
  const t1 = new Triangle()
  const t2 = new Triangle()
  t1.transformation.rotate(Math.PI * 0).translate(t1.size, 0)
  t2.transformation.rotate(Math.PI * 1).translate(0, t2.size).translate(t2.size, 0)

  return [t1, t2]
}

export const ParallelogramShape = () => {
  const hypotenuse = Math.sqrt(Math.pow(200, 2) * 2)
  return new Shape(
    { x: 0, y: 0 },
    0,
    { x: 0, y: 0 },
    getBorderAdaptedParallelogram,
    [
      { x: 0, y: 0 },
      { x: hypotenuse, y: 0 },
      { x: hypotenuse * 1.5, y: hypotenuse * 0.5 },
      { x: hypotenuse * 0.5, y: hypotenuse * 0.5 },
    ],
    PARALLELOGRAM(),
  )
}

function getBorderAdaptedParallelogram(borderWidth: number) {
  const hypotenuse = Math.sqrt(Math.pow(200, 2) * 2)
  const miterLength = borderWidth / 2 / Math.sin(Math.PI / 4)
  const miterLength2 = borderWidth / 2 / Math.sin(3 * Math.PI / 4)

  return [
    { x: 0 + borderWidth / 2 + miterLength, y: 0 + borderWidth / 2 },
    { x: hypotenuse + borderWidth / 2 - miterLength2, y: 0 + borderWidth / 2 },
    { x: hypotenuse * 1.5 - borderWidth / 2 - miterLength, y: hypotenuse * 0.5 - borderWidth / 2 },
    { x: hypotenuse * 0.5 - borderWidth / 2 + miterLength2, y: hypotenuse * 0.5 - borderWidth / 2 },
  ]
}