import React, {useEffect, useState} from 'react'
import {Point} from "../../model/types";
import './InteractableShape.css'
import {generatePolygonString, getBoundingRectangle} from "../../model/utils/shape-utils";

interface ShapeProps {
  position: Point
  rotation: number
  anchor: Point,
  vertices: Array<Point>
  updatePosition: (x: number, y: number, r: number) => void
}

function InteractableShape(props: ShapeProps) {

  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({x: 0, y: 0})

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', mouseMoveHandler)
    } else {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }

  }, [isDragging]);

  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault()
    if (isDragging) {
      props.updatePosition(
        e.clientX - offset.x,
        e.clientY - offset.y,
        props.rotation,
      )
    }
  }

  const wheelHandler = (e: React.WheelEvent) => {
    props.updatePosition(
      props.position.x,
      props.position.y,
      props.rotation + 0.05 * e.deltaY,
    )

  }

  const rectangle = getBoundingRectangle(props.vertices)
  const pointsString = generatePolygonString(props.vertices)

  return (
    <svg
      style={{
        position: "absolute",
        left: props.position.x,
        top: props.position.y,
        transform: `rotate(${props.rotation}deg)`,
        zIndex: isDragging ? 5 : 1,
        pointerEvents: "none",
      }}
      height={rectangle.height}
      width={rectangle.width}
      className="interactable-shape">
      <polygon
        pointerEvents={'all'}
        onMouseDown={(e) => {
          setOffset((prevState) => {
            return {
              x: e.clientX - props.position.x,
              y: e.clientY - props.position.y,
            }
          })
          setIsDragging(true)
        }}
        onMouseUp={() => setIsDragging(false)}
        onWheel={(e) => wheelHandler(e)}
        points={pointsString}/>
    </svg>
  )
}

export default InteractableShape