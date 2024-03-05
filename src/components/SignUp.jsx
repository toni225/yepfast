import React, { useState } from 'react';
import CredentialForm from './layout/CredentialForm';
import * as userServices from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isParkingOwner, setIsParkingOwner] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    

    const getData = (data) => {
        setEmail(data.email);
        setPassword(data.password);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            password,
            isParkingOwner
        };

        try {
            const apiResponse = await userServices.signup(payload);

            if (apiResponse.data?.status === 201) {
                toast.success("Account Created!");
                navigate('/login');
            }
        } catch (e) {
            toast.error(e.response.data.data.message);
        }
    };

    const handleSelectClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="bg-VO-Primary flex items-center justify-center h-screen">
            {/* Parking Owner and Vehicle Owner */}
            {isOpen && (
                <div className="absolute inset-0 bg-gray-500 opacity-50 blur z-10"></div>
            )}
            {isOpen && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-[426px] h-[620px] relative bg-amber-300 rounded-[20px]">
                        <div className="w-[125px] h-[125px] left-[151px] top-[142px] absolute" />
                        <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-slate-800 rounded-[25px] border border-amber-300 justify-center items-center inline-flex">
                            <div className="text-amber-300 text-2xl font-bold font-['Poppins']">Select</div>
                        </div>
                        <div className="left-[94px] top-[267px] absolute text-slate-800 text-[32px] font-bold font-['Poppins']">Vehicle Owner</div>
                        <div className="w-[238px] left-[94px] top-[371px] absolute text-center text-slate-800 text-opacity-50 text-2xl font-bold font-['Poppins']">Search and locate<br/>available parking lots</div>
                        <div className="w-4 h-[17px] left-[190px] top-[21px] absolute bg-slate-800 rounded-full" />
                        <div className="w-4 h-[17px] left-[221px] top-[21px] absolute bg-slate-800 bg-opacity-50 rounded-full" />
                    </div>
                    <div className="w-[426px] h-[620px] relative bg-slate-800 rounded-[20px] ml-4">
                        <div className="w-[150px] h-[150px] left-[138px] top-[121px] absolute" />
                        <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-amber-300 rounded-[25px] border border-amber-300 justify-center items-center inline-flex" onClick={handleSelectClick}>
                            <div className="text-slate-800 text-2xl font-bold font-['Poppins']">Select</div>
                        </div>
                        <div className="left-[91px] top-[271px] absolute text-white text-[32px] font-bold font-['Poppins']">Parking Owner</div>
                        <div className="w-[243px] left-[99px] top-[365px] absolute text-center text-white text-opacity-50 text-2xl font-bold font-['Poppins']">List and manage your own<br />parking lots</div>
                        <div className="w-4 h-[17px] left-[188px] top-[21px] absolute bg-amber-300 bg-opacity-50 rounded-full" />
                        <div className="w-4 h-[17px] left-[221px] top-[21px] absolute bg-amber-300 rounded-full" />
                    </div>
                </div>
            )}
            {/* Sign-up Form */}
            <form onSubmit={submitForm} className="bg-VO-Secondary relative flex flex-col shadow-md w-1/3 rounded-xl ">
                <h3 className="block font-sans text-7xl antialiased text-VO-Tertiary text-center mt-5">
                    PFASt
                </h3>
                <p className="text-VO-Tertiary text-center font-semibold rtl:ml-5">Registration</p>
                <CredentialForm data={getData} />
                <div className="flex items-center justify-center pb-5">
                    <input type="checkbox" onClick={() => setIsParkingOwner(!isParkingOwner)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="pl-2 text-VO-Tertiary">Parking Owner</label>
                </div>

                <div className="p-6 pt-1">
                    <center>
                        <button
                            className="bg-VO-Tertiary select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <hr className="border-yellow-500 my-5 w-1/2" />  {/*HORIZONTAL LINE AFTER SIGN UP BUTTON*/}
                    </center>
                    <div className="flex justify-center">
                        <a href="login" className="underline inline-block font-sans text-sm antialiased leading-normal text-VO-Tertiary">Log In</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
