import { Shape, Triangle } from "../types";

const MEDIUM_TRIANGLE = () => {
  const t1 = new Triangle()
  const t2 = new Triangle()

  const hypotenuse = Math.sqrt(Math.pow(t1.size, 2) + Math.pow(t2.size, 2))

  t1.transformation
    .rotate(Math.PI * 0.75)
    .translate(hypotenuse / 2)

  t2.transformation
    .rotate(Math.PI * 1.25)
    .translate(hypotenuse / 2)

  return [t1, t2]
}

export const MediumTriangleShape = () => {
  const hypotenuse = Math.sqrt(Math.pow(200, 2) * 2)
  return new Shape(
    { x: 0, y: 0 },
    0,
    { x: 0, y: 0 },
    getBorderAdaptedMediumTriangle,
    [
      { x: 0, y: 0 },
      { x: hypotenuse, y: 0 },
      { x: 0, y: hypotenuse },
    ],
    MEDIUM_TRIANGLE(),
  )
}

function getBorderAdaptedMediumTriangle(borderWidth: number) {
  const hypotenuse = Math.sqrt(Math.pow(200, 2) * 2)
  const miterLength = borderWidth / 2 / Math.sin(Math.PI / 4)

  return [
    { x: 0 + borderWidth / 2, y: 0 + borderWidth / 2 },
    { x: hypotenuse - borderWidth / 2 - miterLength, y: 0 + borderWidth / 2 },
    { x: 0 + borderWidth / 2, y: hypotenuse - borderWidth / 2 - miterLength },
  ]
}