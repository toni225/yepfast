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
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,63})+$/;
        return emailRegex.test(email);
    }
  
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%^*#?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const getData = (data) => {
        setEmail(data.email);
        setPassword(data.password);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');

        if(!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if(!validatePassword(password)) {
            setPasswordError('Password should be atleast 8 characters and include at least 1 letter, 1 number and 1 special character!');
            return;
        }

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

    const handleSelectClick = (isParkingOwner) => {
        if (isParkingOwner) {
            setIsParkingOwner(true);
            setIsOpen(false);
            console.log('User set as parking owner:', isParkingOwner);
        } else {
            setIsOpen(false);
        }
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
                    <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-slate-800 rounded-[25px] border border-amber-300 justify-center items-center inline-flex hover:cursor-pointer hover:transform hover:scale-125 transition-transform duration-300" onClick={() => setIsOpen(false)}>
                        <div className="text-amber-300 text-2xl font-bold font-['Poppins']">Select</div>
                    </div>
                        <div className="left-[150px] top-[100px] absolute">
                        <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_5_69)">
                            <path d="M98.3049 31.3824L98.3055 31.3841L109.125 62.5422V104.167C109.125 106.893 106.893 109.125 104.167 109.125H98.9583C96.2318 109.125 94 106.893 94 104.167V98.9583V98.7083H93.75H31.25H31V98.9583V104.167C31 106.893 28.7682 109.125 26.0417 109.125H20.8333C18.1068 109.125 15.875 106.893 15.875 104.167V62.5422L26.6939 31.3859C26.694 31.3856 26.6941 31.3853 26.6942 31.385C27.7546 28.407 30.5282 26.2917 33.8542 26.2917H91.1458C94.4748 26.2917 97.2972 28.4095 98.3049 31.3824ZM35.6771 36.2083H35.4993L35.4409 36.3763L29.8159 52.5742L29.7006 52.9063H30.0521H94.8958H95.2473L95.132 52.5742L89.507 36.3763L89.4487 36.2083H89.2708H35.6771ZM98.9583 88.7917H99.2083V88.5417V62.5V62.25H98.9583H26.0417H25.7917V62.5V88.5417V88.7917H26.0417H98.9583Z" fill="#262341" stroke="#262341" strokeWidth="0.5"/>
                            <path d="M46.625 75.5208C46.625 79.6975 43.2392 83.0833 39.0625 83.0833C34.8858 83.0833 31.5 79.6975 31.5 75.5208C31.5 71.3442 34.8858 67.9583 39.0625 67.9583C43.2392 67.9583 46.625 71.3442 46.625 75.5208Z" fill="#262341" stroke="#262341" stroke-width="0.5"/>
                            <path d="M93.5 75.5208C93.5 79.6975 90.1142 83.0833 85.9375 83.0833C81.7608 83.0833 78.375 79.6975 78.375 75.5208C78.375 71.3442 81.7608 67.9583 85.9375 67.9583C90.1142 67.9583 93.5 71.3442 93.5 75.5208Z" fill="#262341" stroke="#262341" stroke-width="0.5"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_5_69">
                            <rect width="125" height="125" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>

                        <div className="left-[94px] top-[267px] absolute text-slate-800 text-[32px] font-bold font-['Poppins']">Vehicle Owner</div>
                        <div className="w-[238px] left-[94px] top-[371px] absolute text-center text-slate-800 text-opacity-50 text-2xl font-bold font-['Poppins']">Search and locate<br/>available parking lots</div>
                        <div className="w-4 h-[17px] left-[190px] top-[21px] absolute bg-slate-800 rounded-full" />
                        <div className="w-4 h-[17px] left-[221px] top-[21px] absolute bg-slate-800 bg-opacity-50 rounded-full" />
                    </div>
                    <div className="w-[426px] h-[620px] relative bg-slate-800 rounded-[20px] ml-4">
                        <div className="w-[150px] h-[150px] left-[138px] top-[121px] absolute" />
                        <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-amber-300 rounded-[25px] border border-amber-300 justify-center items-center inline-flex hover:cursor-pointer hover:transform hover:scale-125 transition-transform duration-300" onClick={() => handleSelectClick(true)}>
                        <div className="text-slate-800 text-2xl font-bold font-['Poppins']">Select</div>
                    </div>
                        <div className="left-[140px] top-[100px] absolute">
                        <svg width="140" height="140" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M72.4875 23.4675L31.2375 60.66C30.8481 61.0115 30.5368 61.4407 30.3236 61.92C30.1104 62.3993 30.0002 62.9179 30 63.4425V116.25C30 117.245 30.3951 118.198 31.0984 118.902C31.8016 119.605 32.7554 120 33.75 120H45V86.25C45 83.2663 46.1853 80.4048 48.295 78.295C50.4048 76.1853 53.2663 75 56.25 75H93.75C96.7337 75 99.5952 76.1853 101.705 78.295C103.815 80.4048 105 83.2663 105 86.25V120H116.25C117.245 120 118.198 119.605 118.902 118.902C119.605 118.198 120 117.245 120 116.25V63.45C120.001 62.9242 119.891 62.4041 119.678 61.9234C119.465 61.4427 119.153 61.0123 118.763 60.66L77.5125 23.46C76.8234 22.8381 75.9282 22.4939 75 22.4939C74.0718 22.4939 73.1766 22.8456 72.4875 23.4675ZM33.75 127.5C30.7663 127.5 27.9048 126.315 25.795 124.205C23.6853 122.095 22.5 119.234 22.5 116.25V63.45C22.5 60.2625 23.85 57.225 26.22 55.0875L67.47 17.895C69.5363 16.0335 72.2189 15.0033 75 15.0033C77.7811 15.0033 80.4637 16.0335 82.53 17.895L123.78 55.095C124.949 56.1478 125.884 57.434 126.524 58.8706C127.165 60.3071 127.497 61.862 127.5 63.435V116.25C127.5 119.234 126.315 122.095 124.205 124.205C122.095 126.315 119.234 127.5 116.25 127.5H33.75ZM97.5 120V105H52.5V120H97.5ZM97.5 86.25C97.5 85.2554 97.1049 84.3016 96.4017 83.5983C95.6984 82.8951 94.7446 82.5 93.75 82.5H56.25C55.2554 82.5 54.3016 82.8951 53.5984 83.5983C52.8951 84.3016 52.5 85.2554 52.5 86.25V97.5H97.5V86.25Z" fill="white"/>
                            </svg>
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
                <CredentialForm data={getData} validationErrors={{emailError, passwordError}}/>
                {/* {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>} */}
                {/* <div className="flex items-center justify-center pb-5">
                    <input type="checkbox" onClick={() => setIsParkingOwner(!isParkingOwner)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="pl-2 text-VO-Tertiary">Parking Owner</label>
                </div> */}

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
