import React, { useRef, useEffect} from "react";
import * as CONSTANTS from "./gameConstants"
import * as OBJECTS_CONSTANTS from "./gameObjectsData"


export default function Board (props) {

  const canvas = useRef(null);

  
  console.log(props);

  useEffect(() => {

    const render = ()=>{
        const context = canvas.current.getContext("2d");
        context.clearRect(0,0,CONSTANTS.boardDimensions.width,CONSTANTS.boardDimensions.height)
        context.fillStyle = OBJECTS_CONSTANTS.roverObj.color;
        context.fillRect(props.roverPos.x, props.roverPos.y, OBJECTS_CONSTANTS.roverObj.dx, OBJECTS_CONSTANTS.roverObj.dy);
        context.fillStyle = OBJECTS_CONSTANTS.baseObj.color;
        context.fillRect(OBJECTS_CONSTANTS.baseObj.x, 0, OBJECTS_CONSTANTS.baseObj.dx, OBJECTS_CONSTANTS.baseObj.dy);
        props.obstacles.forEach(obstacle => {
          context.fillStyle = OBJECTS_CONSTANTS.obstacleObj.color;
          context.fillRect(obstacle.posX, obstacle.posY, OBJECTS_CONSTANTS.obstacleObj.dx, OBJECTS_CONSTANTS.obstacleObj.dy)
        });;
        requestAnimationFrame(render)
    }
    render()
  },[props.obstacles,props.roverPos]);

  return <canvas id="canvas" ref={canvas} width={CONSTANTS.boardDimensions.width} height={CONSTANTS.boardDimensions.height} />;
};