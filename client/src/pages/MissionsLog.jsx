import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import LoadingComponent from "../components/Loading";

const API_URL = process.env.REACT_APP_SERVER_URL




function MissionLog (){

    const [missionsLog, setMissionsLog]= useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user} = useContext(AuthContext)
    const navigate = useNavigate()
    


    const storedToken = localStorage.getItem('authToken')

    useEffect(()=>{
        const userId = user?._id

        axios.get(`${API_URL}/user/info/${userId}`,{ headers: { Authorization: `Bearer ${storedToken}`}})
        .then((missions)=>{
        console.log(missions.data)
        setMissionsLog(...[], missions.data)
        setIsLoading(false)
    
        })
        .catch((err) => {
            console.log(err)
            navigate(PATHS.MISSIONLOG)
        });
        
      },[user])


    return(
        <>
        {isLoading ? <LoadingComponent/> :  
        <div className="missionsLog">
            <h1>Missions log</h1>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Wrong Instructions</th>
                    <th>Instructions</th>
                    </tr>
                </thead>
                <tbody>
                    {missionsLog.map((mission)=>{
                        return(
                        <tr key={mission._id}>
                            <td>{mission.missionName}</td>
                            <td>{mission.wrongInstructions}</td>
                            <td>{mission.totalInstructions}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            </div>}
        </>
        
    )
}

export default MissionLog