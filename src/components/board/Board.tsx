import React, {useState} from 'react'
import {
  BigTriangleShape,
  MediumTriangleShape,
  ParallelogramShape,
  SmallTriangleShape,
  SquareShape
} from "../../model/shapes";
import {Distance, Shape} from "../../model/types";
import InteractableShape from "../shape/InteractableShape";

function Board() {
  const [shapes, setShapes] = useState([
    {name: 'small1', shape: SmallTriangleShape().setPosition({x: 322 + 300, y: 181 + 300}).setRotation(315)},
    {name: 'small2', shape: SmallTriangleShape().setPosition({x: 40 + 300, y: 463 + 300}).setRotation(45)},
    {name: 'medium', shape: MediumTriangleShape().setPosition({x: 280 + 300, y: 280 + 300}).setRotation(180)},
    {name: 'big1', shape: BigTriangleShape().setPosition({x: -200 + 300, y: 80 + 300}).setRotation(135)},
    {name: 'big2', shape: BigTriangleShape().setPosition({x: 80 + 300, y: -200 + 300}).setRotation(225)},
    {name: 'square', shape: SquareShape().setPosition({x: 181 + 300, y: 322 + 300}).setRotation(45)},
    {name: 'rhombus', shape: ParallelogramShape().setPosition({x: 280 + 300, y: 140 + 300}).setRotation(90)},
  ])

  const updateShape = (x: number, y: number, r: number, name: string) => {
    setShapes((previousShapes) => {
      const newShapes = previousShapes
        .filter(shape => name != shape.name)
      let oldShape = previousShapes.find(shape => shape.name == name)

      let newShape = new Shape(
        {x, y},
        r,
        oldShape!.shape.anchor,
        oldShape!.shape.vertices,
        oldShape!.shape.triangles,
      )

      const epsilon = 30
      let allDistances: Array<Distance> = []
      newShapes.forEach(shape => {
        const distancesFromNewShape = shape.shape.distancesToShape(newShape)
        allDistances.push(...distancesFromNewShape)
      })

      const segmentDistances = allDistances
        .filter(distance => distance.distanceToSegment <= epsilon)
        .sort((a, b) => a.distanceToSegment - b.distanceToSegment)

      const vertexDistances = allDistances
        .filter(distance => distance.distanceToVertex <= epsilon)
        .sort((a, b) => a.distanceToVertex - b.distanceToVertex)

      const shortestSegmentDistance = segmentDistances[0]
      const shortestVertexDistance = vertexDistances[0]

      let snap = {x: 0, y: 0}
      if (shortestSegmentDistance != null && shortestVertexDistance != null) {
        snap = shortestVertexDistance <= shortestSegmentDistance
        ? shortestVertexDistance.vectorToVertex
        : shortestSegmentDistance.vectorToSegment
      } else if (shortestSegmentDistance == null && shortestVertexDistance != null) {
        snap = shortestVertexDistance.vectorToVertex
      } else if (shortestSegmentDistance != null && shortestVertexDistance == null) {
        snap = shortestSegmentDistance.vectorToSegment
      }

      const newNewShape = new Shape(
        {x: x + snap.x, y: y + snap.y},
        r,
        oldShape!.shape.anchor,
        oldShape!.shape.vertices,
        oldShape!.shape.triangles,
      )

      return [...newShapes, {name: oldShape!.name, shape: newNewShape}]
    })
  }

  const renderedShapes = shapes.map((shape, index) => {
    return <InteractableShape
      key={shape.name}
      position={shape.shape.position}
      rotation={shape.shape.rotation}
      anchor={shape.shape.anchor}
      vertices={shape.shape.vertices}
      updatePosition={(x: number, y: number, r: number) => updateShape(x, y, r, shape.name)}
    ></InteractableShape>
  })

  return (
    <div>
      {renderedShapes}
    </div>
  )
}

export default Board