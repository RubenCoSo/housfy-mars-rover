import * as PATHS from "../utils/paths";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import marsGif from '../media/mars gif.gif'


function HomePage(props) {
  const [isInstructionsShown, setIsInstructionsShown] = useState(false)

  const showHideInstructions = () => {
    isInstructionsShown ? setIsInstructionsShown(false) : setIsInstructionsShown(true)
    console.log(props.user);
  }

  return (
    <div className="home">
      <h1>Rover On Mars</h1>
      <img src={marsGif} alt='mars'/>
      <button><Link className="linkButton" to={PATHS.MISSION}>New Mission</Link></button>
      <button onClick={showHideInstructions}>Instructions</button>
      {isInstructionsShown ? 
        <div className="instructions">
          <h1>Instructions</h1>
          <p>Welcome to the Rover mission on mars. You will have to drive the Rover (black square) from the starting point to the base (green square).
          for that purpose you have to use the next comands:</p>
          <div>
            <ul className="instructionsList">
              <li>F to move Up</li>
              <li>R to move Right</li>
              <li>L to move Left</li>
            </ul>
          </div>
          <p>You can send long instructions "e.g.:FFRFLFL... " though the form. Be careful, the Rover is an expensive robot
          and it's programmed to stop and reset the instructions if it founds any obstacle(orange square) on the given route.</p>
        </div> : null}
    </div>
  );
}

export default HomePage;
