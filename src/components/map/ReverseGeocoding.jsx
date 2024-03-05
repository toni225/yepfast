import { LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const ReverseGeocoding = (props) => {
    const Longitude = props.long;
    const Latitude = props.lat;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Latitude},${Longitude}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`

    const [address, setAddress] = useState([]);

    const reverse = () => {
        
    }

    useEffect( () => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setAddress(data.results[0].formatted_address);
        })
        .catch(err => console.warn(err.message))
    })

    return ( 
        <div>{address}</div>
     );
}
 
export default ReverseGeocoding;