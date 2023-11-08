import {Shape, Triangle} from "../types";

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
    {x: 0, y: 0},
    0,
    {x: 0, y: 0},
    [
      {x: 0, y: 0},
      {x: hypotenuse, y: 0},
      {x: 0, y: hypotenuse},
    ],
    MEDIUM_TRIANGLE(),
  )
}