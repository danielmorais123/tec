import { BrowserRouter, Route, Routes } from "react-router-dom";
import Application from "./Application";
import { AuthContextProvider, useAuth } from "./auth/useAuth";
import Dash from "./pages/Dash";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Dash />}></Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
