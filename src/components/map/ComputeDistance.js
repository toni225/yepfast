//check if the parking lot is in the VO's radius. returns boolean
export function checkCircleInMarker(markerPosition, circlePosition, radius) {
  var R = 6371e3; // Earth's radius in meters
  var φ1 = (markerPosition.lat * Math.PI) / 180;
  var φ2 = (circlePosition.lat * Math.PI) / 180;
  var Δφ = ((circlePosition.lat - markerPosition.lat) * Math.PI) / 180;
  var Δλ = ((circlePosition.lng - markerPosition.lng) * Math.PI) / 180;

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distance = R * c; // Distance in meters

  return distance <= radius;
}
