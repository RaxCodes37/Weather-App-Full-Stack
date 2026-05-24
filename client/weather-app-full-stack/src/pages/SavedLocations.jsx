import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/index.css";

export const SavedLocations = ({ user }) => {
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(true);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const [locationInfo, setLocationInfo] = useState({
    name: "",
    country: "",
    description: "",
    feels_temp: "",
    temp: "",
    max_temp: "",
    min_temp: "",
  });
  const [checkSearch, setCheckSearch] = useState(false);

  useEffect(() => {
    const getSavedLocations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/saved-locations");
        setLocations(res.data.message.rows);
      } catch (error) {
        console.error(error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    getSavedLocations();
  }, []);

  if (loading) {
    return <div className="w-screen flex justify-center">Loading...</div>;
  }

  const getLocation = async (location) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location.location_name}&appid=${api_key}&units=metric`,
      );
      const data = await res.json();
      
      setCheckSearch(true);
      setLocationInfo({
        ...locationInfo,
        name: `${data.name}`,
        country: `${data.sys.country}`,
        description: `${data.weather[0].description}`,
        feels_temp: `${Math.round(data.main.feels_like)}C°`,
        temp: `${Math.round(data.main.temp)}C°`,
        max_temp: `${Math.round(data.main.temp_max)}C°`,
        min_temp: `${Math.round(data.main.temp_min)}C°`,
      });
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  return (
    <>
      {user ? (
        <div className="grid justify-center">
          <div className="container rounded-md min-h-20 w-100 mt-20 text-center">
            <h2 className="underline">Saved Locations</h2>
            {locations.map((location) => (
              <div
                className="my-2 mb-4 flex justify-center items-center gap-2"
                key={location.location_id}
              >
                <p>
                  {location.location_name}, {location.location_country}
                </p>

                <button
                  className="search-button rounded-md"
                  onClick={() => getLocation(location)}
                >
                  Weather
                </button>
              </div>
            ))}
          </div>
          { checkSearch ? (
            <div className="container rounded-md mt-10 text-center">
              <div className="flex justify-center items-center gap-2">
                <h2>{locationInfo.name}, {locationInfo.country}</h2>
                <i className="fa-solid fa-location-dot text-xl"></i>
              </div>
              


            </div>
          ) : (
            <div></div>
          )}
          
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="container rounded-md mt-20 w-100 p-2 text-center">
            <h2>
              You shouldn't be <span className="underline">here!!</span> 😡
            </h2>

            <div className="mt-2">
              <p>Please Login to Save Locations</p>
              <p>
                Go back{" "}
                <Link to="/" className="underline">
                  Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
