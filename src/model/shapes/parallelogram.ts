import {Shape, Triangle} from "../types";

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
    {x: 0, y: 0},
    0,
    {x: 0, y: 0},
    [
      {x: 0, y: 0},
      {x: hypotenuse, y: 0},
      {x: hypotenuse * 1.5, y: hypotenuse * 0.5},
      {x: hypotenuse * 0.5, y: hypotenuse * 0.5},
    ],
    PARALLELOGRAM(),
  )
}