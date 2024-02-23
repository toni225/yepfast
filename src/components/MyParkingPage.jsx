import Layout from "./layout/Layout";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as userServices from "../services/user.service";
import * as authServices from "../services/auth.service";

const MyParkingPage = () => {
    // const CDNURL = "https://evrqsaavaohqlopnfgtq.supabase.co/storage/v1/object/public/images/"

    const navigate = useNavigate()
    const [parkingList,setParkingList] = useState([])
    // const [image,setImage] = useState([])

    const fetchUser = async (username) => {
        try{
            const user = JSON.parse(localStorage.getItem('user'))
            const {data} = await userServices.getMyParking(user.username)
            // console.log(response)
            setParkingList(data.users)
        }catch (e) {
            console.log(e)
        }
    }

    // const getParkingImage = async (username,parkingName) => {
    //     userService.getImageParking(username,parkingName)
    //         .then(res=>{
    //             setImage(res.data.response.data[0]?.name)
    //         })
    // }

    useEffect(()=>{
        fetchUser().catch(e=>console.log(e))
    },[])

    return (
      <Layout>
          <div className={'grid grid-cols-3 content-center'}>
              <div></div>
              <div className={'text-center'}>
                  <h2>My Parkings</h2>
                  <div>
                      <ul>
                          {parkingList.map(myparking=>{
                              // getParkingImage(myparking.username,myparking.ParkingName)
                              return (
                                  <li key={myparking.ParkingID}>
                                      <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                          {/*<img className="w-full" src={`${CDNURL}${myparking.username}/${myparking.ParkingName}/${image}`} alt="Sunset in the mountains"/>*/}
                                              <div className="px-6 py-4">
                                                  <div className="font-bold text-xl mb-2">{myparking.ParkingName}</div>
                                              </div>
                                              <div className="px-6 pt-4 pb-2">
                                                <button
                                                    className={'rounded-md border px-9 py-2 hover:bg-amber-500'}
                                                    onClick={()=>navigate(`/myparking/${myparking.ParkingID}/edit`)}
                                                >
                                                    Edit
                                                </button>
                                              </div>
                                      </div>
                                  </li>
                              )
                          })}
                      </ul>
                  </div>
              </div>
              <div className={'place-items-center'}>
                  <button
                      type={"button"}
                      onClick={()=>navigate('/create')}
                      className="md:ml-10 mt-5 focus:outline-none text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                  >Add Parking</button>
              </div>
          </div>
      </Layout>
    )
}

export default MyParkingPage
