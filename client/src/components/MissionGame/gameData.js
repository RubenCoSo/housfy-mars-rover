import * as CONSTANTS from "./gameConstants"


export const gameData = {
    roverObj: {
        x: CONSTANTS.boardDimensions.width/2-25/2,
        y:CONSTANTS.boardDimensions.height-25,
        dx: 25,
        dy:25,
        color:"black"
    },
    obstacleObj:{
        dx:25,
        dy:25,
        color:'red'
    },
    baseObj:{
        x:CONSTANTS.boardDimensions.width/2-25/2,
        y:0,
        dx:25,
        dy:25,
        color:'yellow'
    }

}