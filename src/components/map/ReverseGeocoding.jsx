import { LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const ReverseGeocoding = (props) => {
    const Longitude = props.long;
    const Latitude = props.lat;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Latitude},${Longitude}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`

    const [address, setAddress] = useState([]);
    const [responseStatus, setResponseStatus] = useState("");

    useEffect( () => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.status === "OK") {
                setAddress(data.results[0].formatted_address);
            } else if(data.status === "ZERO_RESULTS") {         // check if 0 result 
                setAddress(data.plus_code.compound_code);       // then get compound_code address
            } else if(data.status === "INVALID_REQUESTS") {
                console.warn("the query (address, components or latlng) is missing.");
            } else if(data.status === "UNKOWN_ERROR") {
                console.warn("the request could not be processed due to a server error. The request may succeed if you try again.");
            }
        })
        .catch(err => console.warn(err.message))
    })

    return ( 
        <div>{address}</div>
     );
}
 
export default ReverseGeocoding;