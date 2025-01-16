import { useState } from "react";
import Left from "./home/left/left";
import Right from "./home/left/right/right";
import Login from "./components/login";
import Signup from "./components/signup";
import { AuthContext } from "./context/AuthProviderContext.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConversationContextProvider } from "./context/ConversationContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  let initialUserState = localStorage.getItem("ChatApp");
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );
  console.log(initialUserState, authUser);

  return (
    <>
      <ConversationContextProvider>
        <AuthContext.Provider value={[authUser, setAuthUser]}>
          <SocketContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  authUser ? (
                    <div>
                      <div className="hidden h-screen sm:flex">
                        <Left />
                        <Right />
                      </div>
                      <div className="drawer sm:hidden ">
                        <input
                          id="my-drawer"
                          type="checkbox"
                          className="drawer-toggle"
                        />
                        <div className="drawer-content">
                          {/* Page content here */}
                          <Right />
                         
                        </div>
                        <div className="drawer-side">
                          <label
                            htmlFor="my-drawer"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                          ></label>
                          <ul className="menu bg-base-200 text-base-content p-0 max-h-full min-h-full w-[80vw]">
                            {/* Sidebar content here */}
                            <Left />
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Navigate to={"/login"}></Navigate>
                  )
                }
              />
              <Route
                path="/login"
                element={authUser ? <Navigate to={"/"} /> : <Login />}
              />
              <Route
                path="/signup"
                element={authUser ? <Navigate to={"/"} /> : <Signup />}
              />
            </Routes>
            <Toaster />
          </SocketContextProvider>
        </AuthContext.Provider>
      </ConversationContextProvider>
    </>
  );
}

export default App;
