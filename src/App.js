import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css'

import ParkingList from "./components/ParkingList";
import CreateParking from "./components/CreateParking";
import MyParking from "./components/MyParking";
import EditParking from "./components/EditParking";
import ParkingPage from "./components/layout/ParkingPage";
import SignUpV2 from "./components/SignUpV2";
import LoginV2 from "./components/LoginV2";
import {ToastContainer} from "react-toastify";
import AccountPage from "./components/AccountPage";
import {Protected} from "./components/protected";
import MyParkingPage from "./components/MyParkingPage";
import ResetPass from "./components/ResetPass";
import UpdatePass from "./components/UpdatePass";
import AdminPage from "./components/AdminPage";
import AdminLayout from "./components/layout/AdminLayout";
import AdminLogin from "./components/AdminLogin";
import {AdminProtected} from "./components/adminProtected";

function App() {

  return (
    <div className="App">
        <ToastContainer/>
      <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<ParkingList/>}/>
            <Route path={'/account'} element={<Protected><AccountPage/></Protected>}/>
            <Route path={'/create'} element={<Protected><CreateParking/></Protected>}/>
            <Route path={'/myparking/'} element={<Protected><MyParkingPage/></Protected>}/>
            <Route path={'/myparking/:id'} element={<Protected><MyParking/></Protected>}/>
            <Route path={'/myparking/:id/edit'} element={<Protected><EditParking/></Protected>}/>
            <Route path={'/parking'} element={<ParkingPage/>}/>
            <Route path={'/login'} element={<LoginV2/>}/>
            <Route path={'/signup'} element={<SignUpV2/>}/>
            <Route path={'/recovery'} element={<ResetPass/>}/>
            <Route path={'/recovery/updatepass'} element={<UpdatePass/>}/>
            <Route path={'/admin/home'} element={
                <AdminProtected>
                    <AdminPage/>
                </AdminProtected>
            }/>
            <Route path={'/admin'} element={<AdminLogin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
