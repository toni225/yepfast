import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import ParkingList from "./components/ParkingList";
import CreateParking from "./components/CreateParking";
import MyParking from "./components/MyParking";
import EditParking from "./components/EditParking";
import ParkingPage from "./components/layout/ParkingPage";
import SignUpV2 from "./components/SignUpV2";
import LoginV2 from "./components/LoginV2";
import { ToastContainer } from "react-toastify";
import AccountPage from "./components/AccountPage";
import { Protected } from "./components/protected";
import MyParkingPage from "./components/MyParkingPage";
import ResetPass from "./components/ResetPass";
import UpdatePass from "./components/UpdatePass";
import AdminPage from "./components/AdminPage";
import AdminLayout from "./components/layout/AdminLayout";
import AdminLogin from "./components/AdminLogin";
import { AdminProtected } from "./components/adminProtected";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    // setSocket(io("http://localhost:4000"));
    setSocket(io("https://yepfastapi.vercel.app"));
  }, []);

  useEffect(() => {
    if (user != undefined) {
      socket?.emit("newUser", user);
      console.log(user);
      console.log(socket);
    }
  }, [socket, user]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))?.username;

    if (user != undefined) {
      setUser(user);
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<ParkingList />} />
          <Route
            path={"/account"}
            element={
              <Protected>
                <AccountPage />
              </Protected>
            }
          />
          <Route
            path={"/create"}
            element={
              <Protected>
                <CreateParking />
              </Protected>
            }
          />
          <Route
            path={"/myparking/"}
            element={
              <Protected>
                <MyParkingPage />
              </Protected>
            }
          />
          <Route
            path={"/myparking/:id"}
            element={
              <Protected>
                <MyParking />
              </Protected>
            }
          />
          <Route
            path={"/myparking/:id/edit"}
            element={
              <Protected>
                <EditParking />
              </Protected>
            }
          />
          <Route path={"/parking"} element={<ParkingPage socket={socket} />} />
          <Route path={"/login"} element={<LoginV2 />} />
          <Route path={"/signup"} element={<SignUpV2 />} />
          <Route path={"/recovery"} element={<ResetPass />} />
          <Route path={"/recovery/updatepass"} element={<UpdatePass />} />
          <Route
            path={"/admin/home"}
            element={
              <AdminProtected>
                <AdminPage />
              </AdminProtected>
            }
          />
          <Route path={"/admin"} element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
