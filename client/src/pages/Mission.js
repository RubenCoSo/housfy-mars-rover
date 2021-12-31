import { useState } from "react"
import Board from "../components/MissionGame/Board";
import * as CONSTANTS from "../components/MissionGame/gameConstants"


const numObstacles = 20

function Mission () {

    const [instructions, setInstructions] = useState("")
    const [obstaclesArr, setObstaclesArr] = useState([])
    const [roverPos, setRoverPos] = useState({x:CONSTANTS.boardDimensions.width/2-25/2, y:CONSTANTS.boardDimensions.height-25})
    const [isObstacle, setIsObstacle] = useState(false)
    const [failedInstruction, setFailedInstruction] = useState('')
    let positionsArr = []
    let finalPosition 



    

    function handleInputChange(event) {
        const instructionsInput = event.target.value;
    
        return setInstructions(instructionsInput);
    }

    function createObstacles (){
        let obstacles = []
        for (let i = 0; i <= numObstacles; i++) {
          let obstacle = {
            posX:(Math.floor(Math.random() * (20 - 0)) + 0)*25-25/2,
            posY:(Math.floor(Math.random() * (20 - 0)) + 0)*25
          }
    
          obstacles.push(obstacle)
          
        }
        setObstaclesArr(obstacles)
    }

    function checkObstacles(){

        console.log('check', positionsArr);

        for (let i = 0; i < positionsArr.length; i++) {

            
            for (let j = 0; j < obstaclesArr.length; j++) {

                console.log('compare',positionsArr[i],obstaclesArr[j]);
               if(positionsArr[i].x === obstaclesArr[j].posX 
                &&
                positionsArr[i].x === obstaclesArr[j].posY){
                    finalPosition = positionsArr[i-1]
                    break
               }else{
                   console.log(positionsArr[i]);
                   finalPosition = positionsArr[i]
               }
                
            }
            
        }

        console.log('RFP',finalPosition);

        setRoverPos(finalPosition)
    }


    function roverMovementPositions (){

        let instructionsArr = instructions.split('')
        console.log(instructionsArr);
        let newPosX = 0
        let newPosY = 0
        let initialPosX = roverPos.x
        let initialPosY = roverPos.y

        positionsArr.push({x:initialPosX, y:initialPosY})       
        

        instructionsArr.forEach(instruction => {
            

            switch(instruction){
                case "F":
                    newPosY = initialPosY -25
                    newPosX = initialPosX 
                    break;
                case "L":
                    newPosX = initialPosX -25
                    newPosY = initialPosY
                    break;
                case "R":
                    newPosX = initialPosX + 25
                    newPosY = initialPosY
                    break
                default:
            }

            positionsArr.push({x:newPosX, y: newPosY})

            initialPosX = newPosX
            initialPosY = newPosY



        })
    }

    function roverMovement (event){
        event.preventDefault()

        roverMovementPositions()
        checkObstacles()
        setRoverPos(finalPosition)
        setInstructions('')
        positionsArr = []
    }
    
    return(
        <>
        <div>
            <Board obstacles={obstaclesArr} roverPos={roverPos}/>
        </div>
            <button className="button__start" onClick={createObstacles}>
                Start game
            </button>
        <div>
            <h1>Insert Instructions</h1>
            <form onSubmit={roverMovement} className="signup__form">
                <label htmlFor="input-instructions">Instructions</label>
                <input
                id="input-instructions"
                type="text"
                name="instructions"
                placeholder="instructions"
                value={instructions}
                onChange={handleInputChange}
                required
                />

                <button className="button__submit" type="submit">
                Submit
                </button>
            </form>
        </div>
        </>

  
    )
}

export default Mission