import { useState, useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const Directions = ({ directions, origin }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !directions || !origin)
      return;

    // Call Directions API with the updated origin
    directionsService
      .route({
        origin,
        destination: directions.destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        console.log("Directions API response:", response);
        directionsRenderer.setOptions({
          polylineOptions: {
            strokeColor: "#f25f4c",
          },
          suppressMarkers: true,
        });
        directionsRenderer.setDirections(response); // Update directions with new response
        setRoutes(response.routes);
        directionsRenderer.setMap(map);
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
        // Handle error
      });

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [directions, origin, directionsService, directionsRenderer, map]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;
};

export default Directions;
