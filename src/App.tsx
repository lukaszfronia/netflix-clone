import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Serials from "./pages/Serials";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="main" element={<Home />}></Route>
        <Route path="/films" element={<Movies />}></Route>
        <Route path="/serials" element={<Serials />}></Route>
      </Routes>
    </>
  );
}

export default App;
