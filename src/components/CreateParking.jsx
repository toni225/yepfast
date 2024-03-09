import * as userServices from "../services/user.service"

import Layout from "./layout/Layout";
import {useState, useEffect, createRef} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import MapDisplay from "./map/MapDisplay";

const CreateParking = () => {
    const navigate = useNavigate()

    const localStorageUser = localStorage.getItem('user')
    const [showModal, setShowModal] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    const imageRef = createRef()

    const [username, setUsername] = useState("")
    const [ParkingName,setParkingName] = useState("")
    const [ParkingStatus,setParkingStatus] = useState(false)
    const [Lat,setLat] = useState(undefined)
    const [Lng,setLng] = useState(undefined)
    const [FourWheelsPrice,setFourWheelsPrice] = useState(0)
    const [FourWheelsStatus,setFourWheelsStatus] = useState(false)
    const [TwoWheelsPrice,setTwoWheelsPrice] = useState(0)
    const [TwoWheelsStatus,setTwoWheelsStatus] = useState(false)
    const [ParkingSpace,setParkingSpace] = useState(0)
    const [filename, setFilename] = useState('No File Chosen')

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFilename(file.name);
        }
    };
    
    const markedLocation = (loc) => {
        setLat(loc.lat)
        setLng(loc.lng)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image',imageRef.current.files[0])
        formData.append('parkingName',ParkingName)
        setIsLoading(true)

        const payload = {
            ParkingName,
            ParkingStatus,
            Lat,
            Lng,
            FourWheelsPrice,
            FourWheelsStatus,
            TwoWheelsPrice,
            TwoWheelsStatus,
            username
        }
    

        try{
            const apiResponse = await userServices.createParking(payload)
            const apiUploadImageRes = await userServices.uploadImageParking(username,formData)

            if(apiResponse.data?.status === 201 && apiUploadImageRes.status === 200){
                toast.success("Parking Created!")
                setParkingName('')
                setLat('')
                setLng('')
                navigate('/')
                setIsLoading(false)
            }
        }catch (e){
            toast.error("Error!")
            console.log(e)

            userServices.removeParking(ParkingName).then(()=> setIsLoading(false))
                .catch(e=>console.log(e))
        }
    }

    useEffect(()=>{
        if(localStorageUser!==null){
            const lsUsername = JSON.parse(localStorageUser)
            setUsername(lsUsername.username)
        }
    },[])

    return(
        <Layout>
            <div>
                {/* <h1 className="text-orange-500 text-center">CREATE PARKING</h1> */}
                <br></br>
                <div className="mx-auto max-w-lg p-6 bg-PO-Secondary border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="text-amber-300 text-2xl font-normal font-['Poppins']">Add Parking</div>
                    <form className="max-w-sm mx-auto" onSubmit={submitForm}>
                        <div className="mb-5">
                            <label htmlFor="parking_name" className="text-white text-sm font-normal font-['Poppins']">Parking Name</label>
                            <input
                                id="parking_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={ParkingName}
                                onChange={e=>setParkingName(e.target.value)}
                                placeholder="Parking Name"
                                required
                            />
                        </div>
                        <div className="mb-5">
                    <label htmlFor="parking_loc" className="text-white text-sm font-normal font-['Poppins']">Location</label>
                    <div className="flex gap-2">
                        <div className="relative">
                            <input
                                id="parking_lat"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={Lat}
                                onChange={e => setLat(e.target.value)}
                                placeholder="Location"
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


                            {/* <button type="button" className="mt-3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                    onClick={()=>setShowModal(true)}
                            >Open Map</button> */}

                    <br></br>
                    <div className="w-[380px] h-[46px] relative">
                    <div className="w-[380px] h-[46px] left-[2px] top-0 absolute bg-PO-Secondary rounded-[10px] border border-amber-300" />
                    <div
                        className="cursor-pointer pl-[9px] pr-3 pt-1.5 pb-1 left-[9px] top-[6px] absolute bg-amber-300 rounded-[10px] border border-amber-300 justify-center items-center gap-[7px] inline-flex"
                        onClick={() => imageRef.current.click()}
                    >
                        <div className="w-6 h-6 relative flex-col justify-start items-start flex">
                            <svg
                                width="24"
                                height="24"
                                viewBox="-1 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_62_164)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.5 3.99998C8.85098 3.99998 6.73898 6.37998 7.02698 8.99998C7.05366 9.24258 6.99159 9.48664 6.85224 9.68702C6.71289 9.8874 6.5057 10.0305 6.26898 10.09C5.56191 10.2712 4.94508 10.7038 4.53389 11.3068C4.12269 11.9099 3.9453 12.6421 4.0349 13.3665C4.1245 14.0909 4.47495 14.7578 5.02069 15.2425C5.56643 15.7273 6.27008 15.9965 6.99998 16H7.99998C8.2652 16 8.51955 16.1053 8.70709 16.2929C8.89462 16.4804 8.99998 16.7348 8.99998 17C8.99998 17.2652 8.89462 17.5195 8.70709 17.7071C8.51955 17.8946 8.2652 18 7.99998 18H6.99998C5.85069 18.0007 4.73623 17.6055 3.84417 16.8809C2.95212 16.1563 2.33693 15.1464 2.10215 14.0214C1.86737 12.8963 2.02734 11.7247 2.55513 10.7038C3.08292 9.68288 3.94631 8.87494 4.99998 8.41598C5.01804 6.89991 5.56552 5.43785 6.54768 4.2828C7.52984 3.12775 8.88488 2.35237 10.3783 2.09085C11.8718 1.82932 13.4097 2.0981 14.7259 2.85067C16.0421 3.60325 17.0538 4.79226 17.586 6.21198C18.9853 6.59787 20.1973 7.4778 20.9976 8.68877C21.7979 9.89975 22.1323 11.3597 21.9387 12.7983C21.7452 14.2369 21.0369 15.5566 19.9449 16.513C18.853 17.4694 17.4515 17.9976 16 18C15.7348 18 15.4804 17.8946 15.2929 17.7071C15.1053 17.5195 15 17.2652 15 17C15 16.7348 15.1053 16.4804 15.2929 16.2929C15.4804 16.1053 15.7348 16 16 16C17.005 16.0015 17.9738 15.6246 18.7136 14.9443C19.4534 14.264 19.9099 13.3302 19.9925 12.3286C20.0751 11.3269 19.7775 10.3309 19.1591 9.53868C18.5407 8.74644 17.6467 8.21603 16.655 8.05298C16.464 8.0214 16.2862 7.93562 16.1426 7.80585C15.999 7.67608 15.8957 7.50778 15.845 7.32098C15.5857 6.36723 15.0198 5.52531 14.2345 4.92512C13.4493 4.32493 12.4883 3.99983 11.5 3.99998ZM13 12.416L14.293 13.708C14.386 13.8008 14.4963 13.8744 14.6177 13.9246C14.7392 13.9748 14.8693 14.0006 15.0007 14.0005C15.1321 14.0004 15.2622 13.9745 15.3835 13.9241C15.5049 13.8737 15.6151 13.8 15.708 13.707C15.8008 13.614 15.8744 13.5036 15.9246 13.3822C15.9748 13.2608 16.0006 13.1307 16.0005 12.9993C16.0004 12.8679 15.9745 12.7378 15.9241 12.6164C15.8737 12.4951 15.8 12.3848 15.707 12.292L12.883 9.47298C12.6486 9.2391 12.3311 9.10774 12 9.10774C11.6689 9.10774 11.3513 9.2391 11.117 9.47298L8.29298 12.293C8.10534 12.4805 7.99987 12.7349 7.99978 13.0001C7.99968 13.2654 8.10497 13.5198 8.29248 13.7075C8.47999 13.8951 8.73436 14.0006 8.99963 14.0007C9.2649 14.0008 9.51934 13.8955 9.70698 13.708L11 12.416V21C11 21.2652 11.1053 21.5195 11.2929 21.7071C11.4804 21.8946 11.7348 22 12 22C12.2652 22 12.5196 21.8946 12.7071 21.7071C12.8946 21.5195 13 21.2652 13 21V12.416Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_62_164">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <div className="text-slate-800 text-xs font-bold font-['Poppins']">Upload File</div>
                    </div>
                    <div className="left-[140px] top-[13px] absolute text-white text-sm font-normal font-['Poppins']">{filename}</div>
                </div>
                    
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="parking_image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parking Image</label> */}
                            {/* <input
                                id="parking_image"
                                type={'file'}
                                ref={imageRef}
                                accept={'image/png, image/jpeg'}
                                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                onChange={handleFileChange} */}

                                <input
                                type="file"
                                ref={imageRef}
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }} // Hide the input element
                                onChange={handleFileChange}
                                />
                        </div>
                        <button
                            type={"submit"}
                            disabled={isLoading}
                            className="disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add Parking
                        </button>
                        <button
                            type={"button"}
                            onClick={()=>navigate(-1)}
                            className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Cancel
                        </button>
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
                                        console.log(Lat,Lng)
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

export default CreateParking
