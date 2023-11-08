import React from 'react'
import {Point} from "../../model/types";
import './DrawnFigure.css'
import {generatePolygonString, getBoundingRectangle} from "../../model/utils/shape-utils";

interface ShapeProps {
  position: Point
  scale: number
  polygons: Array<Array<Point>>
}

function DrawnFigure(props: ShapeProps) {

  const drawnShapes = props.polygons.map((polygon, index) => {

    const rectangle = getBoundingRectangle(polygon)
    const pointsString = generatePolygonString(polygon)

    return <svg
      key={`figure-polygon-${index}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
      }}
      height={rectangle.height}
      width={rectangle.width}
      className="figure-polygon">
      <polygon
        points={pointsString}/>
    </svg>
  })

  return (
    <div
      style={{
        position: 'absolute',
        left: props.position.x,
        top: props.position.y,
        transform: `scale(${props.scale})`,
      }}
    >
      {drawnShapes}
    </div>
  )
}

export default DrawnFigure