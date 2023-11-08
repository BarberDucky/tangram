import {BigTriangleShape, MediumTriangleShape, ParallelogramShape, SmallTriangleShape, SquareShape} from "../shapes";
import {Figure} from "../types";

const SquareFigureShapes = () => {
  return [
    SmallTriangleShape().setPosition({x: 322, y: 181}).setRotation(315),
    SmallTriangleShape().setPosition({x: 40, y: 463}).setRotation(45),
    MediumTriangleShape().setPosition({x: 280, y: 280}).setRotation(180),
    BigTriangleShape().setPosition({x: -200, y: 80}).setRotation(135),
    BigTriangleShape().setPosition({x: 80, y: -200}).setRotation(225),
    SquareShape().setPosition({x: 181, y: 322}).setRotation(45),
    ParallelogramShape().setPosition({x: 280, y: 140}).setRotation(90),
  ]
}

export const SquareFigure = () => {
  const hypotenuse = Math.sqrt(Math.pow(400, 2) * 2)
  return new Figure(
    [[
      {x: 0, y: 0},
      {x: hypotenuse, y: 0},
      {x: hypotenuse, y: hypotenuse},
      {x: 0, y: hypotenuse},
    ]],
    SquareFigureShapes(),
  )
}