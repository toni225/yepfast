import { LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const ReverseGeocoding = (props) => {
    const Longitude = props.long;
    const Latitude = props.lat;
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Latitude},${Longitude}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    // const url = `https://nominatim.openstreetmap.org/reverse?lat=${Latitude}&lon=${Longitude}&format=json`
    const url = "localhost"

    const [address, setAddress] = useState([]);
    const [responseStatus, setResponseStatus] = useState("");

    useEffect( () => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setAddress(data.display_name)
        })
        .catch(err => console.warn(err.message))
    })

    return ( 
        <div>{address}</div>
     );
}
 
export default ReverseGeocoding;
