import React, {useEffect, useState} from 'react';
import './App.css';
import DrawnFigure from "./components/figure/DrawnFigure";
import {SquareFigure} from "./model/figures";
import Board from "./components/board/Board";
import Title from "./components/title/Title";

interface State {
  titleProgress: number,
  boardProgress: number,
  figureProgress: number,
}

interface Action {
  perform: (t: number) => Partial<State>
  when: number
  duration: number
}

const actions: Array<Action> = [
  {perform: t => ({titleProgress: t}), when: 0, duration: 2000},
  {perform: t => ({figureProgress: t}), when: 2000, duration: 2000},
  {perform: t => ({boardProgress: t}), when: 4000, duration: 1000},
]

function getStateFromActions(actions: Array<Action>, t: number) {
  return actions
    .filter(action => t >= action.when && t < action.when + action.duration)
    .reduce((acc, curr) => {
      const interpolatedValue = (t - curr.when) / curr.duration
      const newState = curr.perform(interpolatedValue)
      return {
        ...acc,
        ...newState
      }
    }, {} as Partial<State>)
}

function App() {

  const [gameState, setGameState] = useState({
    titleProgress: 0,
    boardProgress: 0,
    figureProgress: 0,
  } as State)

  useEffect(() => {

    const callback = (t: number) => {

      setGameState((prevState) => {
        return {
          ...prevState,
          ...getStateFromActions(actions, t)
        }
      })

      return requestAnimationFrame(callback)
    }

    const id = requestAnimationFrame(callback)

    return () => cancelAnimationFrame(id)

  }, []);

  const figure = SquareFigure()

  return (
    <div className="app">
      <Title progress={gameState.titleProgress}></Title>
      <div style={{opacity: 1 - Math.pow(1 - gameState.figureProgress, 5)}}>
        <DrawnFigure
          position={getFigurePosition(gameState.figureProgress)}
          scale={getFigureScale(gameState.figureProgress)}
          polygons={figure.polygons}
        ></DrawnFigure>
      </div>
      <div style={{opacity: 1 - Math.pow(1 - gameState.boardProgress, 5)}}>
        <Board></Board>
      </div>
    </div>
  )
}

function getFigurePosition(progress: number) {
  const w = window.innerWidth
  const h = window.innerHeight
  return {
    x: progress * (w / 2) + w / 2 - 286,
    y: (1 - progress) * (h / 2),
  }
}

function getFigureScale(progress: number) {
  return (1 - progress) * 0.5 + 0.5
}

export default App;
