import {APIProvider, AdvancedMarker, InfoWindow, Map,Pin, Marker, useAdvancedMarkerRef, useMarkerRef} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import Directions from "./Directions";
import {toast} from "react-toastify";
import "./Map.css";

const MapDisplay = ({data = [],page,markedLocation}) => {
    const position = {lat: 10.324444518537874, lng:123.95277453359705}

    const [marker,setMarker] = useState({})
    const [openInfoWindow, setOpenInfoWindow] = useState(false)
    const [markerRef, useMarker] = useAdvancedMarkerRef()
    const [selectedMarker, setSelectedMarker] = useState(null)

    const [directions,setDirections] = useState({})
    const [doDirections,setDoDirections] = useState(false)
    const [origin,setOrigin] = useState('')

    useEffect(()=>{
        if(page==="CreateParking"){
            markedLocation({lat:marker.lat,lng:marker.lng})

        }
    },[marker])

    useEffect(()=>{
       if(navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(pos=>{
               const lat = pos.coords.latitude
               const lng = pos.coords.longitude

               setOrigin(`${lat}, ${lng}`)
           },err=>{
               setOrigin('10.32546837125536, 123.95334301842492')
               console.log(err)
               toast.warning('Location is turned off.')
           })
       }else {
           setOrigin('10.32546837125536, 123.95334301842492')
       }
    },[])
    
    if(page==="ParkingPage"){
        return (
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div style={{height: "90vh"}}>
                    <Map
                        mapId={"bf51a910020fa25a"}
                        zoom={15}
                        center={position}
                    >
                        {data?.map(parking => {
                            return (
                                <div key={parking.ParkingID}>
                                    <AdvancedMarker 
                                        ref={markerRef}
                                        onClick={(e)=>{
                                            setOpenInfoWindow(true);
                                            setSelectedMarker(parking.ParkingID)}
                                        } 
                                        position={{lat:parseFloat(parking.Lat),lng:parseFloat(parking.Lng)}}>
                                    <Pin
                                        background={'#22ccff'}
                                        borderColor={'#1e89a1'}
                                        glyphColor={'#0f677a'}>
                                    </Pin>
                                    {
                                        openInfoWindow && selectedMarker === parking.ParkingID && (
                                            <div key={parking.ParkingID}>
                                                <InfoWindow
                                                    maxWidth={400}
                                                    position={{lat:parseFloat(parking.Lat),lng:parseFloat(parking.Lng)}}
                                                    onCloseClick={() => {
                                                        setOpenInfoWindow(false)
                                                        setDoDirections(false)
                                                        setDirections('')
                                                    }}>
                                                    <div className="p-2 relative">
                                                        <div className="relative">
                                                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hautetime.com%2Fwp-content%2Fuploads%2F2015%2F08%2FPlace_Vendome_Paris_20_April_2011.jpg&f=1&nofb=1&ipt=18bea3a33b7591e2d27ec2e34c6089aaea807b81e074279344c21f863ab16741&ipo=images" className="max-h-52 rounded-md"></img>
                                                            <div className="absolute px-3 py-1 bottom-[-18px] left-2 text-[#fffffe] text-3xl bg-slate-800 rounded-full">
                                                            {parking.ParkingName}
                                                            </div>
                                                        </div>
                                                        <div className="relative mt-5">
                                                            <div className="grid grid-cols-2 gap-6 items-center">
                                                                <div id="fourWheels" className=""><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z"/></svg></div>
                                                                <div id="twoWheels" className=""><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M160-200q-66 0-113-47T0-360q0-57 36.5-101t93.5-55l-28-24H0v-60h180l100 60 160-60h126l-62-80H400v-80h142l84 108 134-68v120h-92l70 92q15-6 30.5-9t31.5-3q66 0 113 47t47 113q0 66-47 113t-113 47q-66 0-113-47t-47-113q0-27 9.5-52.5T676-460l-20-24-136 204H400l-80-70q-5 63-51 106.5T160-200Zm0-80q33 0 56.5-23.5T240-360q0-33-23.5-56.5T160-440q-33 0-56.5 23.5T80-360q0 33 23.5 56.5T160-280Zm294-240-144 54 144-54h130-130Zm346 240q33 0 56.5-23.5T880-360q0-33-23.5-56.5T800-440q-33 0-56.5 23.5T720-360q0 33 23.5 56.5T800-280Zm-322-80 106-160H454l-144 54 120 106h48Z"/></svg></div>
                                                                <div id="availableSpace" classNmae="">10 AVAILABLE SPACES</div>
                                                            </div>
                                                            
                                                            <button
                                                                className={"rounded-md bg-amber-600 p-3 hover:bg-amber-500"}
                                                                onClick={()=>{
                                                                    setDirections({
                                                                        origin,
                                                                        destination: `${parking.Lat}, ${parking.Lng}`
                                                                    })
                                                                    setDoDirections(true)
                                                                }}
                                                            >Directions</button>
                                                        </div>
                                                    
                                                    </div>
                                                </InfoWindow>
                                            </div>
                                        )
                                    }
                                    </AdvancedMarker>
                                </div>
                            )
                        })}
                        {doDirections && <Directions directions={directions}/>}
                    </Map>
                </div>

            </APIProvider>
        )
    }
    if(page==="CreateParking"){
        return (
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div style={{height: "60vh"}}>
                    <Map
                        zoom={15}
                        center={position}
                        onClick={e=> {
                            setMarker({lat: e.detail.latLng.lat, lng: e.detail.latLng.lng});


                        }}
                    >
                        {marker && (<Marker position={{lat:parseFloat(marker?.lat),lng:parseFloat(marker?.lng)}}/>)}
                    </Map>
                </div>

            </APIProvider>
        )
    }


}

export default MapDisplay
