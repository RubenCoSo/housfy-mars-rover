import HomePage from "../pages/HomePage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import MissionsLog from "../pages/MissionsLog";
import Mission from "../pages/Mission";
import * as PATHS from "../utils/paths";



const routes = (props) => {
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },

    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },
    {
      path: PATHS.MISSIONLOG,
      element:
        <MissionsLog {...props} />
    },
    {
      path: PATHS.MISSION,
      element: <Mission {...props} />,
    }
  ];
};

export default routes;
