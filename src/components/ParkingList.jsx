import * as userServices from "../services/user.service"

import {useEffect, useState} from "react";
import Layout from "./layout/Layout";
import gps from "./images/gps.png"
import {useNavigate} from "react-router-dom";
import { ArrowUpLeftIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon, ExclamationCircleIcon, MapIcon } from '@heroicons/react/24/solid';



const ParkingList = () => {
    const navigate = useNavigate()
    const [parkingList,setParkingList] = useState([])

    const fetchUser = async () => {
        try{
            const {data} = await userServices.getAllParking()
            setParkingList(data.users)

        }catch (e) {
            
        }
    }

    useEffect(()=>{
       fetchUser()
    },[])

    return (
        <Layout>
            <div>
                {/* <div className="mt-10 flex justify-center">
                    <div className="flex items-center">
                        <img src={gps} class="object-contain h-20 w-20" alt=""></img>
                    </div> */}

                <div className="mt-10 flex justify-center -mb-10">
                    <div className="flex items-center">
                        <button onClick={()=>navigate('/parking')}>
                            <img src={gps} className="object-contain h-20 w-20 mx-auto transition-transform duration-300 transform hover:scale-110" alt=""></img>
                            <h1 className="text-slate-800 text-2xl text-center font-sans font-bold mb-8">Explore Parkings</h1>
                        </button>
                    </div>
                </div>

                <hr className="m-5 border-slate-500"/>
                <h1 className="text-black-500 text-4xl text-center font-sans font-bold mb-8">Parking Lots Near You</h1>
                <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 pr-10 pl-10">
                    {parkingList.map((parking)=>{
                        return (
                            <li key={parking.ParkingID} className="bg-[#a7a9be] bg-opacity-30 border-solid border rounded-md shadow-my-shadow">
                                <div className=" overflow-ellipsis truncate" >
                                    <div className="flex">
                                        <div className="m-2 w-[105px]">
                                            <img  className="rounded-md shadow-my-shadow min-w-[105px] h-[100px]" src="https://static.stacker.com/s3fs-public/2019-03/Screen%20Shot%202019-03-14%20at%2010.49.01%20AM.png"></img>
                                        </div>
                                        <div className="bg-gray-300 bg-opacity-25 rounded-md m-2 px-2 box-border border-1 max-h-[100px] flex flex-col overflow-hidden text-ellipsis ">
                                            <p className="mb-1 text-2xl overflow-hidden text-ellipsis">{parking.ParkingName}</p>
                                            <p className="text-md my-2">
                                                {parking.ParkingStatus ? 
                                                    <>
                                                        <CheckCircleIcon className="h-5 w-5 text-green-500 inline-block mr-1" />
                                                        Available
                                                    </> 
                                                    : 
                                                    <>
                                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500 inline-block mr-1" />
                                                        Unavailable
                                                    </>
                                                }
                                            </p>
                                            <p className="text-md overflow-hidden text-ellipsis">Block 6, Seawage, Pusok, Lapu-Lapu City, Cebu 6015, Philippines</p>
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <div className="bg-[#FF8906] hover:bg-[#ffc27c] m-2 min-w-[105px] rounded-lg text-center shadow-my-shadow flex flex-col justify-between items-center ">
                                                <button type={"button"} className="w-[100%] hover:scale-150" onClick={()=>navigate('/parking',{state: {
                                                    lat: parking.Lat, lng: parking.Lng,parkingId:parking.ParkingID,username:parking.username,parkingName:parking.ParkingName}})}><MapIcon className="h-16 w-[100%]"></MapIcon>NAVIGATE
                                                </button>
                                        </div>
                                        <div className="m-2 w-[100%] flex bg-gray-300 bg-opacity-25 rounded-md">
                                            <div className="w-[50%] flex flex-col justify-between items-center">
                                                <svg className="" xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 0 24 24" width="64px" fill="#FF8906"><path d="M0 0h24v24H0V0z" fill="none"/><path strokeWidth="0.3" stroke="black" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>
                                                <div>P 50/hr</div>
                                            </div>
                                            <div className="w-[50%] flex flex-col justify-between items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="64px" viewBox="0 0 20 20" width="64px" fill="#FF8906"><path strokeWidth="0.3" stroke="black" d="M14.5,9c-0.16,0-0.31,0.02-0.45,0.05L13,8h1.5V6.5l-2,1L11,6H9.01v1h1.58l1,1H9.5L7,9L6,8H3v1h2.5C4.12,9,3,10.12,3,11.5 C3,12.88,4.12,14,5.5,14c1.23,0,2.24-0.88,2.45-2.05L9,13h1.5l2.03-4.06l0.52,0.52C12.42,9.92,12,10.66,12,11.5 c0,1.38,1.12,2.5,2.5,2.5s2.5-1.12,2.5-2.5C17,10.12,15.88,9,14.5,9z M5.5,13C4.67,13,4,12.33,4,11.5S4.67,10,5.5,10 S7,10.67,7,11.5S6.33,13,5.5,13z M14.5,13c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S15.33,13,14.5,13z"/></svg>
                                                <div>P 20/hr</div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Layout>

    )
}

export default ParkingList
