import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider, useAuth } from "./auth/useAuth";
import DialogResetPass from "./components/DialogResetPass";
import Dash from "./pages/Dash";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Dash />}></Route>
            
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
