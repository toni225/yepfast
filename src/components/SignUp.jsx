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
                    <div className="w-[426px] h-[668px] relative bg-slate-800 rounded-[20px]">
                        <div className="w-[150px] h-[150px] left-[138px] top-[121px] absolute" />
                        <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-amber-300 rounded-[25px] border border-amber-300 justify-center items-center inline-flex" onClick={handleSelectClick}>
                            <div className="text-slate-800 text-2xl font-bold font-['Poppins']">Select</div>
                        </div>
                        <svg className="left-[160px] top-[120px] absolute" width="106" height="113" viewBox="0 0 106 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50.4875 8.4675L9.2375 45.66C8.84809 46.0115 8.53675 46.4407 8.32359 46.92C8.11043 47.3993 8.00019 47.9179 8 48.4425V101.25C8 102.245 8.39509 103.198 9.09835 103.902C9.80161 104.605 10.7554 105 11.75 105H23V71.25C23 68.2663 24.1853 65.4048 26.295 63.295C28.4048 61.1853 31.2663 60 34.25 60H71.75C74.7337 60 77.5952 61.1853 79.705 63.295C81.8147 65.4048 83 68.2663 83 71.25V105H94.25C95.2446 105 96.1984 104.605 96.9017 103.902C97.6049 103.198 98 102.245 98 101.25V48.45C98.0009 47.9242 97.8911 47.4041 97.6779 46.9234C97.4647 46.4427 97.1528 46.0123 96.7625 45.66L55.5125 8.46C54.8234 7.8381 53.9282 7.49385 53 7.49385C52.0718 7.49385 51.1766 7.8456 50.4875 8.4675ZM11.75 112.5C8.76631 112.5 5.90483 111.315 3.79505 109.205C1.68526 107.095 0.5 104.234 0.5 101.25V48.45C0.5 45.2625 1.85 42.225 4.22 40.0875L45.47 2.895C47.5363 1.03349 50.2189 0.00332642 53 0.00332642C55.7811 0.00332642 58.4637 1.03349 60.53 2.895L101.78 40.095C102.949 41.1478 103.884 42.434 104.524 43.8706C105.165 45.3071 105.497 46.862 105.5 48.435V101.25C105.5 104.234 104.315 107.095 102.205 109.205C100.095 111.315 97.2337 112.5 94.25 112.5H11.75ZM75.5 105V90H30.5V105H75.5ZM75.5 71.25C75.5 70.2554 75.1049 69.3016 74.4017 68.5983C73.6984 67.8951 72.7446 67.5 71.75 67.5H34.25C33.2554 67.5 32.3016 67.8951 31.5984 68.5983C30.8951 69.3016 30.5 70.2554 30.5 71.25V82.5H75.5V71.25Z" fill="white"/>
                        </svg>
                        <div className="left-[91px] top-[271px] absolute text-white text-[32px] font-bold font-['Poppins']">Parking Owner</div>
                        <div className="w-[243px] left-[99px] top-[365px] absolute text-center text-white text-opacity-50 text-2xl font-bold font-['Poppins']">List and manage your own<br />parking lots</div>
                        <div className="w-4 h-[17px] left-[188px] top-[21px] absolute bg-amber-300 bg-opacity-50 rounded-full" />
                        <div className="w-4 h-[17px] left-[221px] top-[21px] absolute bg-amber-300 rounded-full" />
                    </div>
                    <div className="w-[426px] h-[668px] relative bg-amber-300 rounded-[20px]">
                        <div className="w-[125px] h-[125px] left-[151px] top-[142px] absolute" />
                        <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-slate-800 rounded-[25px] border border-amber-300 justify-center items-center inline-flex">
                            <div className="text-amber-300 text-2xl font-bold font-['Poppins']">Select</div>
                        </div>
                        <div className="left-[94px] top-[267px] absolute text-slate-800 text-[32px] font-bold font-['Poppins']">Vehicle Owner</div>
                        <div className="w-[238px] left-[94px] top-[371px] absolute text-center text-slate-800 text-opacity-50 text-2xl font-bold font-['Poppins']">Search and locate<br/>available parking lots</div>
                        <div className="w-4 h-[17px] left-[190px] top-[21px] absolute bg-slate-800 rounded-full" />
                        <div className="w-4 h-[17px] left-[221px] top-[21px] absolute bg-slate-800 bg-opacity-50 rounded-full" />
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
