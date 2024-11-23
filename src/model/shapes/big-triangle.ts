import { Shape, Triangle } from "../types";

const BIG_TRIANGLE = () => {
  const t1 = new Triangle()
  const t2 = new Triangle()
  const t3 = new Triangle()
  const t4 = new Triangle()

  const hypotenuse = Math.sqrt(Math.pow(t1.size, 2) + Math.pow(t2.size, 2))

  t1.transformation
    .rotate(Math.PI * 0.75)
    .translate(hypotenuse / 2)
    .rotate(Math.PI * 0.75)
    .translate(t1.size)

  t2.transformation
    .rotate(Math.PI * 1.25)
    .translate(hypotenuse / 2)
    .rotate(Math.PI * 0.75)
    .translate(t2.size)

  t3.transformation
    .rotate(Math.PI * 0.75)
    .translate(hypotenuse / 2)
    .rotate(Math.PI * 1.25)
    .translate(t3.size)

  t4.transformation
    .rotate(Math.PI * 1.25)
    .translate(hypotenuse / 2)
    .rotate(Math.PI * 1.25)
    .translate(t4.size)

  return [t1, t2, t3, t4]
}

export const BigTriangleShape = () => {
  return new Shape(
    { x: 0, y: 0 },
    0,
    { x: 0, y: 0 },
    getBorderAdaptedBigTriangle,
    [
      { x: 0, y: 0 },
      { x: 400, y: 0 },
      { x: 0, y: 400 },
    ],
    BIG_TRIANGLE(),
  )
}

function getBorderAdaptedBigTriangle(borderWidth: number) {
  const miterLength = borderWidth / 2 / Math.sin(Math.PI / 4)

  return [
    { x: 0 + borderWidth / 2, y: 0 + borderWidth / 2 },
    { x: 400 - borderWidth / 2 - miterLength, y: 0 + borderWidth / 2 },
    { x: 0 + borderWidth / 2, y: 400 - borderWidth / 2 - miterLength },
  ]
}