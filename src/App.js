import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css'

import ParkingList from "./components/ParkingList";
import CreateParking from "./components/CreateParking";
import MyParking from "./components/MyParking";
import EditParking from "./components/EditParking";
import ParkingPage from "./components/layout/ParkingPage";
import Login from "./components/Login"
import SignUp from "./components/SignUp";
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
import CredentialFormLatest from "./components/layout/CredentialFormLatest";

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
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/signup'} element={<SignUp/>}/>
            <Route path={'/recovery'} element={<ResetPass/>}/>
            <Route path={'/recovery/updatepass'} element={<UpdatePass/>}/>
            <Route path={'/admin/home'} element={
                <AdminProtected>
                    <AdminPage/>
                </AdminProtected>
            }/>
            <Route path={'/admin'} element={<AdminLogin/>}/>
            <Route path={'/test/'} element={<CredentialFormLatest/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
