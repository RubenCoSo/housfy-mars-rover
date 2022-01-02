import * as CONSTANTS from "./gameConstants"


export const roverObj= {
    x: CONSTANTS.boardDimensions.width/2,
    y:CONSTANTS.boardDimensions.height-25,
    dx: 25,
    dy:25,
    color:"black"
}

export const obstacleObj={
        dx:25,
        dy:25,
        color:'red'
    }
    
export const baseObj={
        x:CONSTANTS.boardDimensions.width/2,
        y:0,
        dx:25,
        dy:25,
        color:'green'
    }

