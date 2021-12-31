import React, { useRef, useEffect, useState} from "react";
import * as CONSTANTS from "./gameConstants"


export default function Board (props) {

  const canvas = useRef(null);

  
  console.log(props);

  useEffect(() => {

    const render = ()=>{
        const context = canvas.current.getContext("2d");
        context.clearRect(0,0,CONSTANTS.boardDimensions.width,CONSTANTS.boardDimensions.height)
        context.fillStyle = "black";
        context.fillRect(props.roverPos.x, props.roverPos.y, 25, 25);
        context.fillStyle = "green";
        context.fillRect(CONSTANTS.boardDimensions.width/2-25/2, 0, 25, 25);
        props.obstacles.forEach(obstacle => {
          context.fillStyle = "red";
          context.fillRect(obstacle.posX, obstacle.posY, 25, 25)
        });;
        requestAnimationFrame(render)
    }
    render()
  },[props.obstacles,props.roverPos]);

  return <canvas id="canvas" ref={canvas} width={CONSTANTS.boardDimensions.width} height={CONSTANTS.boardDimensions.height} />;
};