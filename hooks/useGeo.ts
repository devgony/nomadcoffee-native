import Geocoder from "react-native-geocoding";

const useGeo = (lat: number, lng: number) => {
  Geocoder.init("AIzaSyAmTLi1sfmKXS9Hvi6hi4_6G_eSrFSAbdo", {
    language: "en",
    result_type: "political",
  });
  return Geocoder.from({ lat, lng })
    .then(json => {
      return json.results[0].formatted_address;
    })
    .catch(error => console.warn(error));
};
export default useGeo;
