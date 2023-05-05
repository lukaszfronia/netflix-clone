import { Routes, Route } from "react-router-dom";

import Navigation from "./pages/Navigation";
import Main from "./pages/Main";
import Movies from "./pages/Movies";
import Serials from "./pages/Serials";

function App() {
  return (
    <>
      <Navigation />;
      <Routes>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/films" element={<Movies />}></Route>
        <Route path="/serials" element={<Serials />}></Route>
      </Routes>
    </>
  );
}

export default App;
