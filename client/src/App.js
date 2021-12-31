import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import routes from "./config/routes";

export default function App() {
  
  
  return (
    <div className="App">
      <Navbar />
      {/* <Provider store={store}> */}
        <Routes>
          {routes({}).map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      {/* </Provider> */}
    </div>
  );
}
