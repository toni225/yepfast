import * as userServices from "../services/user.service"

import Layout from "./layout/Layout";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import MapDisplay from "./map/MapDisplay";
import axios from "axios";


const EditParking = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [showModal, setShowModal] = useState(false)

    const [ParkingName,setParkingName] = useState("")
    const [ParkingStatus,setParkingStatus] = useState(false)
    const [Lat,setLat] = useState("")
    const [Lng,setLng] = useState("")
    const [FourWheelsPrice,setFourWheelsPrice] = useState(0)
    const [FourWheelsStatus,setFourWheelsStatus] = useState(false)
    const [TwoWheelsPrice,setTwoWheelsPrice] = useState(0)
    const [TwoWheelsStatus,setTwoWheelsStatus] = useState(false)
    const [ParkingSpace,setParkingSpace] = useState(0)
    const [ParkingAddress,setParkingAddress] = useState("")


    const markedLocation = (loc) => {
        setLat(loc.lat)
        setLng(loc.lng)
    }

    const fetchUser = async () => {
        try{
            const {data:{parking}} = await userServices.getParking(id)

            setParkingName(parking[0].ParkingName)
            setLat(parking[0].ParkingLocation.Lat)
            setLng(parking[0].ParkingLocation.Lng)
            setParkingAddress(parking[0].ParkingLocation.Address)
            // setParkingStatus(parking[0].ParkingStatus)
            // setLat(parking[0].Lat)
            // setLng(parking[0].Lng)
            // setFourWheelsPrice(parking[0].FourWheelsPrice)
            // setFourWheelsStatus(parking[0].FourWheelsStatus)
            // setTwoWheelsPrice(parking[0].TwoWheelsPrice)
            // setTwoWheelsStatus(parking[0].TwoWheelsStatus)
            // setParkingSpace(parking[0].ParkingSpace)

        }catch (e) {

        }
    }

    useEffect(()=>{
        fetchUser()
    },[id])

    const changeNewAddress = async () => {
        const {data: {display_name}} = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${Lat}&lon=${Lng}&format=json`)
        // const newParkingAddress = `${address?.road ? `${address?.road}, ` : ''}${address?.neighbourhood ? `${address?.neighbourhood}, `: ''}${address?.hamlet ? `${address?.hamlet}, `: ''}${address?.village ? `${address?.village}, `: ''}${address?.city ? `${address?.city} City`: ''}`

        setParkingAddress(display_name)
    }

    const submitForm = async (e) => {
        e.preventDefault()

        const payload = {
            ParkingName,
            ParkingLocation: {
                Lat,
                Lng,
                Address: ParkingAddress,
            },
            // ParkingStatus,
            // Lat,
            // Lng,
            // FourWheelsPrice,
            // FourWheelsStatus,
            // TwoWheelsPrice,
            // TwoWheelsStatus,
        }

        try{
            const apiResponse = await userServices.editParking(id,payload)

            if(apiResponse.data?.status === 200){
                toast.success("Parking Edited!")
            }
        }catch (e){
            toast.error("Error.")
        }
    }

    const parkingRemove = async () => {
        try{
            const apiResponse = await userServices.removeParking(id)

            if(apiResponse.data?.status === 200){
                toast.success("Parking Deleted!")

                setTimeout(()=>{
                    window.location.href = '/'
                }, 2000)
            }
        }catch (e) {
            toast.error("Error.")
        }
    }

    return(
        
        <Layout>
            
            <div>
                <br></br>

                <div className="mx-auto max-w-lg p-6 bg-PO-Secondary border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <form className="max-w-sm mx-auto" onSubmit={submitForm}>
                    
                    <div className="flex justify-between">
                        <h1 className="text-PO-Tertiary text-2xl">Edit Parking</h1>
                        <div>
                        <button
                            type={"button"}
                            onClick={()=>navigate(-1)}
                            className="text-white bg-PO-Tertiary hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Back
                        </button>
                        </div>
                    </div>
                    
                    <br></br>
                        <div className="mb-5">
                            <label htmlFor="parking_name" className="block mb-2 text-white dark:text-white text-base">Parking Name</label>
                            <input
                                id="parking_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e=>setParkingName(e.target.value)}
                                placeholder="Parking Name"
                                value={ParkingName}
                                required
                            />
                        </div>

                        {/* <div className="mb-5">
                            <label htmlFor="parking_loc" className="block mb-2 text-sm font-medium text-white dark:text-white">Location</label>
                            <div className="flex gap-2">
                                <input
                                    id="parking_lat"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={e=>setLat(e.target.value)}
                                    value={Lat}
                                    placeholder="Latitude"
                                    required
                                />
                                <input
                                    id="parking_lng"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={e=>setLng(e.target.value)}
                                    value={Lng}
                                    placeholder="Longitude"
                                    required
                                />
                            </div>
                        </div> */}

                        <label htmlFor="parking_loc" className="text-white text-sm font-normal font-['Poppins']">Location</label>
                    <div className="flex gap-2">
                        <div className="relative">
                            <input
                                id="parking_lat"
                                // className="bg-gray-50 border borde   r-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                className="bg-slate-200 border border-slate-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={ParkingAddress}
                                placeholder="Location"
                                readOnly
                                style={{ pointerEvents: 'none' }}
                                required
                            />
                            <svg
                                className="absolute right-2 top-2.5 cursor-pointer"
                                onClick={()=>setShowModal(true)}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="ic:baseline-add-location-alt">
                                    <path id="Vector" d="M18.5 4V1.5H19.5V4V4.5H20H22.5V5.5H20H19.5V6V8.5H18.5V6V5.5H18H15.5V4.5H18H18.5V4ZM13.5 7V7.5H14H16.5V10V10.5H17H19.4703C19.4894 10.7308 19.5 10.9641 19.5 11.2C19.5 12.7252 18.8858 14.4403 17.585 16.3581C16.339 18.195 14.4822 20.189 12 22.3405C9.51779 20.189 7.66105 18.195 6.41504 16.3581C5.11418 14.4403 4.5 12.7252 4.5 11.2C4.5 6.51144 8.06059 3.5 12 3.5C12.5099 3.5 13.0113 3.54773 13.5 3.64705V7ZM12 13.5C13.3761 13.5 14.5 12.3761 14.5 11C14.5 9.62386 13.3761 8.5 12 8.5C10.6239 8.5 9.5 9.62386 9.5 11C9.5 12.3761 10.6239 13.5 12 13.5Z" fill="#F9D94A" stroke="#262341" />
                                </g>
                            </svg>
                        </div>
                    </div>

                    <hr className="border-slate-500 max-w-sm mx-auto m-5"/>
                    <div className="max-w-sm mx-auto flex justify-between">
                        <button
                            type="button"
                            onClick={parkingRemove}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >Remove Parking
                        </button>

                        <button
                            type={"submit"}
                            className="text-white bg-PO-Tertiary hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save
                        </button>

                    </div>
                    </form>

                </div>

            </div>
            {showModal ? (<>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-screen  my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Modal Title
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative flex-auto">
                                <MapDisplay page={"CreateParking"} markedLocation={markedLocation}/>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        changeNewAddress()
                                        // console.log(Lat,Lng)
                                    }}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>) : null}
        </Layout>
    )
}

export default EditParking
