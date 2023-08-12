import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Login from "./screens/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { login, logout } from "./redux/user/userActions";
import Profile from "./screens/profile/Profile";

const Home = React.lazy(() => import("./screens/home/Home"));

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const userReducer = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (userReducer) {
      setUser(userReducer?.user);
    }
  }, [userReducer]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route
                path="/home"
                element={
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loader />}>
                    <div
                      className="No-page-found"
                      style={{
                        height: "100vh",
                        backgroundColor: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h1 style={{ color: "red", fontSize: "2rem" }}>
                        {" "}
                        404 - PAGE NOT FOUND
                      </h1>
                    </div>
                  </Suspense>
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loader />}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loader />}>
                    <div
                      className="No-page-found"
                      style={{
                        height: "100vh",
                        backgroundColor: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h1 style={{ color: "red", fontSize: "2rem" }}>
                        {" "}
                        404 - PAGE NOT FOUND
                      </h1>
                    </div>
                  </Suspense>
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
