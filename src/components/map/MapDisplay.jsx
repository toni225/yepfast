import React, { useState, useEffect, useRef } from "react";
import { APIProvider, AdvancedMarker, InfoWindow, Map, Pin, Marker } from "@vis.gl/react-google-maps";
import { Autocomplete } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";
import Directions from "./Directions";
import { toast } from "react-toastify";
import * as userService from '../../services/user.service';

const libraries = ["places"];

const MapDisplay = ({ data = [], page, markedLocation }) => {
    const position = { lat: 10.324444518537874, lng: 123.95277453359705 };
    const CDNURL = "https://evrqsaavaohqlopnfgtq.supabase.co/storage/v1/object/public/images/";
    const [image, setImage] = useState([]);
    const [marker, setMarker] = useState({});
    const [openInfoWindow, setOpenInfoWindow] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [directions, setDirections] = useState({});
    const [doDirections, setDoDirections] = useState(false);
    const [origin, setOrigin] = useState('');
    const markerRef = useRef(null);
    const autocompleteRef = useRef(null);

    useEffect(() => {
        if (page === "CreateParking") {
            markedLocation({ lat: marker.lat, lng: marker.lng });
        }
    }, [marker, page, markedLocation]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                setOrigin(`${lat}, ${lng}`);
            }, err => {
                setOrigin('10.32546837125536, 123.95334301842492');
                console.log(err);
                toast.warning('Location is turned off.');
            });
        } else {
            setOrigin('10.32546837125536, 123.95334301842492');
        }
    }, []);

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                setMarker({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                });
            }
        }
    };

    const getParkingImage = async (username, parkingName) => {
        userService.getImageParking(username, parkingName)
            .then(res => {
                setImage(res.data.response.data[0]?.name);
            });
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}>
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div style={{ height: "90vh", position: "relative" }}>
                    <Map
                        mapId={"bf51a910020fa25a"}
                        zoom={15}
                        center={position}
                        onClick={(e) => {
                            if (page === "CreateParking") {
                                setMarker({
                                    lat: e.detail.latLng.lat,
                                    lng: e.detail.latLng.lng
                                });
                            }
                        }}
                    >
                        {data?.map(parking => (
                            <div key={parking.ParkingID}>
                                <AdvancedMarker
                                    onClick={(e) => {
                                        setOpenInfoWindow(true);
                                        setSelectedMarker(parking.ParkingID);
                                        getParkingImage(parking.username, parking.ParkingName); // Make sure getParkingImage is defined
                                    }}
                                    position={{ lat: parseFloat(parking.Lat), lng: parseFloat(parking.Lng) }}
                                >
                                    <Pin
                                        background={'#22ccff'}
                                        borderColor={'#1e89a1'}
                                        glyphColor={'#0f677a'}
                                    />
                                    {openInfoWindow && selectedMarker === parking.ParkingID && (
                                        <InfoWindow
                                            maxWidth={400}
                                            position={{ lat: parseFloat(parking.Lat), lng: parseFloat(parking.Lng) }}
                                            onCloseClick={() => {
                                                setOpenInfoWindow(false);
                                                setDoDirections(false);
                                                setDirections('');
                                            }}
                                        >
                                            {/* InfoWindow content */}
                                        </InfoWindow>
                                    )}
                                </AdvancedMarker>
                            </div>
                        ))}
                        {doDirections && <Directions directions={directions} />}
                        {page === "CreateParking" && marker.lat && (
                            <Marker position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }} />
                        )}
                        {page === "ParkingPage" && (
                            <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
                                <Autocomplete
                                    onLoad={(autocomplete) => {
                                        autocompleteRef.current = autocomplete;
                                    }}
                                    onPlaceChanged={handlePlaceChanged}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search for a location"
                                        style={{
                                            boxSizing: `border-box`,
                                            border: `1px solid transparent`,
                                            width: `240px`,
                                            height: `32px`,
                                            padding: `0 12px`,
                                            borderRadius: `3px`,
                                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                            fontSize: `14px`,
                                            outline: `none`,
                                            textOverflow: `ellipses`,
                                        }}
                                    />
                                </Autocomplete>
                            </div>
                        )}
                    </Map>
                </div>
            </APIProvider>
        </LoadScript>
    );
};

export default MapDisplay;
