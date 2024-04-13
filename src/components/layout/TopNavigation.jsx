// import {Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import * as userService from "../../services/user.service";
import { useEffect, useState, useRef } from "react";
import { onSignOut } from "../shared/function.shared";
import * as authService from "../../services/auth.service";

const TopNavigation = ({ socket = null }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isParkingOwner, setIsParkingOwner] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const notificationRef = useRef(null);
  const [notification, setNotification] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // authService.isLoggedIn().then(res=>{setIsLogin(res)}).catch(()=>{setIsLogin(false)})
    // authService.getUserInfo().then(response=>{
    //     setIsParkingOwner(response.data.data.user?.user_metadata.isParkingOwner)
    //     // console.log(response)
    // }).catch(e=>{console.log(e)})
    if (localStorage.getItem("user") === null) {
      setIsLogin(false);
    }

    if (localStorage.getItem("isParkingOwner") === "true") {
      setIsParkingOwner(true);
    }
  }, []);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);

  const handleNotificationClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  return (
    <>
      {/* <nav className="border-gray-200 bg-VO-Secondary"> */}
      <nav
        className={`border-gray-200 ${
          isParkingOwner ? "bg-PO-Secondary" : "bg-VO-Secondary"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span
              className={`self-center text-2xl font-['Poppins'] whitespace-nowrap ${
                isParkingOwner ? "text-PO-Tertiary" : "text-VO-Tertiary"
              }`}
            >
              PFASt
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-VO-Tertiary rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-VO-Tertiary hover:bg-VO-Tertiary hover:text-VO-Secondary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <div
                  ref={notificationRef}
                  className={`cursor-pointer h-5 ${
                    isParkingOwner ? "text-PO-Tertiary" : "text-VO-Tertiary"
                  } md:hover:text-white flex font-['Poppins']`}
                  onClick={handleNotificationClick}
                >
                  {/* <BellIcon className="pr-1 pt-1 h-5" /> */}
                  <p>Notification</p>
                </div>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-10 right-15 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-transform duration-300 transform scale-100 opacity-100"
                  >
                    <div className={"flex justify-end"}>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Clear
                      </button>
                    </div>
                    {/* Dropdown content goes here */}
                    {notification.map((notif) => {
                      return (
                        <div
                          //   key={notif.NotifID}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {/* <p>{`${
                            notif.ParkingID?.ParkingName
                              ? `${notif.ParkingID?.ParkingName}: `
                              : ""
                          } ${notif.body}`}</p> */}
                          <p>{notif.senderName}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>

              {isParkingOwner ? (
                <li>
                  <Link
                    to={"/myparking"}
                    className="block py-2 px-3 text-PO-Tertiary rounded md:border-0 md:hover:text-white md:p-0 font-['Poppins']"
                  >
                    MyParking
                  </Link>
                </li>
              ) : (
                <li>
                  <NavLink
                    to={"/"}
                    className="block py-2 px-3 text-VO-Tertiary rounded md:border-0 md:hover:text-white md:p-0 font-['Poppins']"
                  >
                    Parking
                  </NavLink>
                </li>
              )}
              {isLogin ? (
                <li>
                  <NavLink
                    to={"/account"}
                    className={`font-['Poppins'] block py-2 px-3 ${
                      isParkingOwner ? "text-PO-Tertiary" : "text-VO-Tertiary"
                    } rounded md:border-0 md:hover:text-white md:p-0`}
                  >
                    Account
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to={"/login"}
                    className={`font-['Poppins'] block py-2 px-3 text-VO-Tertiary rounded md:border-0 md:hover:text-white md:p-0`}
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {/*<button className="block text-gray-900" onClick={getUserInfo}>clikc</button>*/}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavigation;
