import {Shape, Triangle} from "../types";

const SQUARE = () => {
  const t1 = new Triangle()
  const t2 = new Triangle()
  t1.transformation.rotate(Math.PI * 0)
  t2.transformation.rotate(Math.PI * 1).translate(t2.size)

  return [t1, t2]
}

export const SquareShape = () => {
  return new Shape(
    {x: 0, y: 0},
    0,
    {x: 0, y: 0},
    [
      {x: 0, y: 0},
      {x: 200, y: 0},
      {x: 200, y: 200},
      {x: 0, y: 200},
    ],
    SQUARE(),
  )
}