import * as userService from '../services/user.service'
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const ResetPass = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email.trim()) {
            // If email is empty, handle the case here
            toast.warning("Please enter a valid email address.")
            return;
        }

        try {
            const res = userService.resetPass({ email })
            return res
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="bg-VO-Primary flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="max-w-auto bg-VO-Secondary relative flex flex-col shadow-md w-1/3 rounded-xl ">
                <h3 className="block font-['Poppins'] text-4xl antialiased text-VO-Tertiary text-center mt-10">
                    Forgot Password
                </h3>
                <h4 className="mx-12 text-justify block font-['Poppins'] text-s antialiased text-gray-500 my-10">
                    Enter the email address you used when you joined, and we will reset your password.
                </h4>
                <div className='relative mx-12'> {/* Adjusted margin */}
                    <input
                        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-yellow-500 border-t-transparent text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-yellow-500 focus:border-2 focus:border-yellow-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder={' '} onChange={e => setEmail(e.target.value)} />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-yellow-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-yellow-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#ff8906] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-yellow-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-yellow-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white"> Email </label>
                </div>
                <div className="mx-12 flex justify-between mt-5">
                    <button
                        className="my-5 w-20 inline-block px-3 bg-VO-Tertiary select-none rounded-lg py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={()=>navigate(-1)}
                        type={'button'}>Cancel</button>

                    <button
                        className="my-5 w-20 inline-block px-3 bg-VO-Tertiary select-none rounded-lg py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type={'submit'}>Next</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPass
