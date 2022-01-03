import axios from "axios";
import { useState, useContext } from "react"
import Board from "../components/MissionGame/Board";
import * as CONSTANTS from "../components/MissionGame/gameConstants"
import * as OBJECTS_CONSTANTS from "../components/MissionGame/gameObjectsData"
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
const API_URL = process.env.REACT_APP_SERVER_URL



const numObstacles = 20

function Mission () {

    const {isLoggedIn, user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [isGameStart, setIsGameStart] = useState(false)
    const [instructions, setInstructions] = useState("")
    const [obstaclesArr, setObstaclesArr] = useState([])
    const [roverPos, setRoverPos] = useState({x:OBJECTS_CONSTANTS.roverObj.x, y:OBJECTS_CONSTANTS.roverObj.y})
    const [isObstacle, setIsObstacle] = useState(false)
    const [isEndGame, setIsEndGame] = useState(false)
    const [instructionCounter, setInstructionCounter] = useState(0)
    const [wrongInstructionCounter, setWrongInstructionCounter] = useState(0)
    const [missionName, setMissionName] = useState('')
    let positionsArr = []
    let finalPosition




    

    function handleInputChange(event) {
        const instructionsInput = event.target.value;
    
        return setInstructions(instructionsInput);
    }

    function handleMissionNameInputChange (event){
        const nameInput = event.target.value

        return setMissionName(nameInput)
    }

    function createObstacles (){
        let obstacles = []
        for (let i = 0; i < numObstacles; i++) {
          let obstacle = {
            posX:(Math.floor(Math.random() * (20 - 0)) + 0)*25,
            posY:(Math.floor(Math.random() * (19 - 1)) + 1)*25
          }
    
          obstacles.push(obstacle)
          
        }
        setObstaclesArr(obstacles)
    }

    function roverMovementPositions (){

        let instructionsArr = instructions.split('')
        console.log(instructionsArr);
        let newPosX = 0
        let newPosY = 0
        let initialPosX = roverPos.x
        let initialPosY = roverPos.y

        positionsArr.push({x:initialPosX, y:initialPosY})
        
        setInstructionCounter(instructionCounter + instructionsArr.length)
        
        instructionsArr.forEach(instruction => {
            

            switch(instruction){
                case "F":
                    newPosY = initialPosY - OBJECTS_CONSTANTS.roverObj.dy
                    newPosX = initialPosX 
                    break;
                case "L":
                    newPosX = initialPosX - OBJECTS_CONSTANTS.roverObj.dx
                    newPosY = initialPosY
                    break;
                case "R":
                    newPosX = initialPosX + OBJECTS_CONSTANTS.roverObj.dx
                    newPosY = initialPosY
                    break
                default:
            }

            positionsArr.push({x:newPosX, y: newPosY})

            initialPosX = newPosX
            initialPosY = newPosY



        })
    }

    function checkObstacles(){


        for (let i = 0; i < positionsArr.length; i++) {

            
            for (let j = 0; j < obstaclesArr.length; j++) {

               if( (positionsArr[i].x === obstaclesArr[j].posX 
                &&
                positionsArr[i].y === obstaclesArr[j].posY)
                || 
                positionsArr[i].x < 0
                || 
                positionsArr[i].x > (CONSTANTS.boardDimensions.width - OBJECTS_CONSTANTS.roverObj.dx)
                ||
                positionsArr[i].y < 0
                || 
                positionsArr[i].y > (CONSTANTS.boardDimensions.height - OBJECTS_CONSTANTS.roverObj.dy)){
                    finalPosition = positionsArr[i-1]
                    setIsObstacle(true)
                    setWrongInstructionCounter(wrongInstructionCounter+1)
                    break
               }else{
                   console.log(positionsArr[i]);
                   finalPosition = positionsArr[i]
               }
                
            }
            
        }

        setRoverPos(finalPosition)
    }

    function endGame (){
        positionsArr.forEach(position => {
            if(position.x === OBJECTS_CONSTANTS.baseObj.x && position.y === OBJECTS_CONSTANTS.baseObj.y){
                setIsEndGame(true)
                setIsGameStart(false)
                setRoverPos(position)
            }
        })
    }


    

    function startGame (){
        setIsGameStart(true)
        setIsEndGame(false)
        createObstacles()
    }

    function roverMovement (event){
        event.preventDefault()

        setIsObstacle(false)
        roverMovementPositions()
        endGame()
        checkObstacles()
        setRoverPos(finalPosition)
        setInstructions('')
        positionsArr = []
    }

    function saveGame (event){

        event.preventDefault()

        const userId = user._id
        const wrongInstructions = wrongInstructionCounter
        const totalInstructions = instructionCounter

        const requestBody = { userId, wrongInstructions, totalInstructions, missionName}

        const storedToken = localStorage.getItem("authToken");

        
        axios.post(`${API_URL}/game/save`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
        }).then((response) => {
            console.log(response);
            setMissionName("");
            setWrongInstructionCounter(0);
            setInstructionCounter(0);
            navigate(PATHS.HOMEPAGE)
        })
        .catch((error) => {
            console.log(error);
        });

      

    }
    
    return(
        <>
        <div>
            <Board obstacles={obstaclesArr} roverPos={roverPos}/>
        </div>
        {isGameStart ? null :
        <button className="button__start" onClick={startGame}>
                {isEndGame? "Reset Game" : `Start Game`}
        </button>
        }
        {isObstacle ? <h4>The Rover found an obstacle and is imposible to continue</h4> : null}
        {isEndGame ? <>
        <h4>The Rover arrived safe to the base. This is the information of this mission:</h4>
        <ul>
            <li>{`Wrong instructions for the given to the Rover: ${wrongInstructionCounter}`}</li>
            <li>{`Instructions used to arrive base: ${instructionCounter}`}</li>
        </ul>
        {isLoggedIn ?
            <form onSubmit={saveGame} className="save__form">
                <label htmlFor="input-missionName">Mission Name</label>
                <input
                id="input-missionName"
                type="text"
                name="missionName"
                placeholder="Mission Name "
                value={missionName}
                onChange={handleMissionNameInputChange}
                required
                />

                <button className="button__submit" type="submit">
                Save Game Stats
                </button>
            </form>
        :null}
        </> : null}
        {isGameStart ? 
        <div>
            <h1>Insert Instructions</h1>
            <form onSubmit={roverMovement} className="instructions__form">
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
        :null}
        </>

  
    )
}

export default Mission