const MockResponse = {
  "route": [
    {
      "latitude": 42.73020035793919,
      "longitude": -73.68182322241921
    },
    {
      "latitude": 42.730443933307185,
      "longitude": -73.68061432268627
    },
    {
      "latitude": 42.730808708361856,
      "longitude": -73.67975985815578
    },
  ],

  "buildings": [
    {
      "title": "Lally Hally",
      "location_type": "start",
      "latitude": 42.73020035793919,
      "longitude": -73.68182322241921
    },
    {
      "title": "Building 2",
      "location_type": "end",
      "latitude": 42.730808708361856,
      "longitude": -73.67975985815578
    },
  ]
}


const MockResponse2 = {
  "route": [
    {
      "latitude": 42.72975825494276,
      "longitude": -73.67830944235584
    },
    {
      "latitude": 42.72997145681171,
      "longitude": -73.67746822832613
    },
    {
      "latitude": 42.73026414996813,
      "longitude": -73.67738462670044
    },
    {
      "latitude": 42.72993893531263,
      "longitude": -73.676754972665
    },
  ],

  "buildings": [
    {
      "title": "Place 1",
      "location_type": "start",
      "latitude": 42.72975825494276,
      "longitude": -73.67830944235584
    },
    {
      "title": "Union",
      "location_type": "end",
      "latitude": 42.72993893531263,
      "longitude": -73.676754972665
    },
  ]
}
import axios from 'axios';

const ParseLocationsAndRoute = async (startLocationString, endLocationString) => {

  const baseUrl = `http://13.56.159.146:8000/api/get-route`
  const query_string = `?starting_location=${startLocationString}&ending_location=${endLocationString}`
  let error = false;
  const response = await axios.get(baseUrl + query_string).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
    error = true;
  });

  console.log(baseUrl + query_string)
  RouteResponse = response.data
  route_found = true;
  let buildings = [];
  let route_details = [];

  if (!error) {
    {/*Parse start and ending locations */ }
    buildings = RouteResponse.buildings.map((building) => ({ latitude: building.latitude, longitude: building.longitude, title: building.title, location_type: building.location_type }))

    {/*Parse Route */ }
    route_details = RouteResponse.route.map((spot) => ({ latitude: spot.latitude, longitude: spot.longitude }))
  }
  return { buildings, route_details, route_found, error }
}




export default ParseLocationsAndRoute;