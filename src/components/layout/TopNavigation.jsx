// import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import * as userService from "../../services/user.service"
import {useEffect, useState} from "react";
import {onSignOut} from "../shared/function.shared";
import * as authService from '../../services/auth.service'
import * as authSerivce from "../../services/auth.service";

const TopNavigation = () => {

    const [isLogin,setIsLogin] = useState(true)
    const [isParkingOwner,setIsParkingOwner] = useState(false)

    useEffect(()=> {
        // authService.isLoggedIn().then(res=>{setIsLogin(res)}).catch(()=>{setIsLogin(false)})
        // authService.getUserInfo().then(response=>{
        //     setIsParkingOwner(response.data.data.user?.user_metadata.isParkingOwner)
        //     // console.log(response)
        // }).catch(e=>{console.log(e)})
        authSerivce.isLoggedIn()
            .then(()=>{
                if(localStorage.getItem('user') === null){
                    setIsLogin(false)
                }

                if((localStorage.getItem('isParkingOwner') === 'true')){
                    setIsParkingOwner(true)
                }
            })
            .catch(()=>{localStorage.clear()})



    },[])

    return(
        <>
<<<<<<< HEAD
            <nav className="border-gray-200 bg-VO-Secondary">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap text-VO-Tertiary">PFASt</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-VO-Tertiary rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-VO-Tertiary hover:bg-VO-Tertiary hover:text-VO-Secondary"
=======
            <nav className="border-gray-200 bg-[#0f0E17] ">
                <div className="max-w-screen-xl flex text-[#fffffe]  flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap">PFASt</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
>>>>>>> origin/main
                            aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">

                            {isParkingOwner ?
                                <li>
                                    <Link to={'/myparking'}
<<<<<<< HEAD
                                          className="block py-2 px-3 text-VO-Tertiary rounded md:border-0 md:hover:text-[#ffd803] md:p-0">
=======
                                          className="block py-2 px-3 rounded md:border-0 md:hover:text-[#ffd803] md:p-0">
>>>>>>> origin/main
                                        MyParking
                                    </Link>
                                </li>
                                 :
                                <li>
                                    <NavLink to={'/'}
<<<<<<< HEAD
                                             className="block py-2 px-3 text-VO-Tertiary rounded md:border-0 md:hover:text-white md:p-0">
=======
                                             className="block py-2 px-3 rounded md:border-0 md:hover:text-[#ffd803] md:p-0">
>>>>>>> origin/main
                                        Parking
                                    </NavLink>
                                </li>
                            }
                            {isLogin ?
                                <li>
                                    <NavLink
                                        to={'/account'}
<<<<<<< HEAD
                                        className="block py-2 px-3 text-VO-Tertiary rounded md:border-0 md:hover:text-[#ffd803] md:p-0"
=======
                                        className="block py-2 px-3 rounded md:border-0 md:hover:text-[#ffd803] md:p-0"
>>>>>>> origin/main
                                    >Account</NavLink>
                                </li>
                                :
                                <li>
                                    <NavLink
                                        to={'/login'}
<<<<<<< HEAD
                                        className="block py-2 px-3 text-VO-Tertiary rounded md:border-0 md:hover:text-white md:p-0"
=======
                                        className="block py-2 px-3  rounded md:border-0 md:hover:text-[#ffd803] md:p-0"
>>>>>>> origin/main
                                    >Login</NavLink>
                                </li>
                            }
                            {/*<button className="block text-gray-900" onClick={getUserInfo}>clikc</button>*/}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default TopNavigation
