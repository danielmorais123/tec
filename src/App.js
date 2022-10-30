import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider, useAuth } from "./auth/useAuth";
import Checkout from "./pages/Checkout";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShopPage from "./pages/ShopPage";
import { supabase } from "./supabase/supabaseConfig";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

function App() {
  const [open, setOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);
  const [selected, setSelected] = useState("shop");
  const [idsProducts, setIdsProducts] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <PayPalScriptProvider
            options={{
              "client-id": "test",
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/"
                element={
                  <ShopPage
                    open={open}
                    setOpen={setOpen}
                    productsInCart={productsInCart}
                    selected={selected}
                    setSelected={setSelected}
                    setProductsInCart={setProductsInCart}
                  />
                }
              ></Route>
              <Route
                path="/checkout"
                element={
                  <Checkout
                    open={open}
                    setOpen={setOpen}
                    selected={selected}
                    setSelected={setSelected}
                    productsInCart={productsInCart}
                    setProductsInCart={setProductsInCart}
                  />
                }
              ></Route>

              <Route
                path="/chat"
                element={
                  <Chat
                    open={open}
                    setOpen={setOpen}
                    selected={selected}
                    setSelected={setSelected}
                    productsInCart={productsInCart}
                    setProductsInCart={setProductsInCart}
                  />
                }
              ></Route>
              <Route
                path="/chat/:chatId"
                element={
                  <Chat
                    open={open}
                    setOpen={setOpen}
                    selected={selected}
                    setSelected={setSelected}
                    productsInCart={productsInCart}
                    setProductsInCart={setProductsInCart}
                  />
                }
              ></Route>
              <Route
                path="/profile/:id"
                element={
                  <Profile
                    open={open}
                    setOpen={setOpen}
                    selected={selected}
                    setSelected={setSelected}
                    productsInCart={productsInCart}
                    setProductsInCart={setProductsInCart}
                  />
                }
              ></Route>
            </Routes>
          </PayPalScriptProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
