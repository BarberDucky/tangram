import {Shape, Triangle} from "../types";

const SMALL_TRIANGLE = () => {
  const t1 = new Triangle()

  return [t1]
}

export const SmallTriangleShape = () => {
  return new Shape(
    {x: 0, y: 0},
    0,
    {x: 0, y: 0},
    [
      {x: 0, y: 0},
      {x: 200, y: 0},
      {x: 0, y: 200},
    ],
    SMALL_TRIANGLE(),
  )
}