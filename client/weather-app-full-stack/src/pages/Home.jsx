import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Home = ({ error, user }) => {
  const [locationName, setLocationname] = useState("");
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const [locationInfo, setLocationInfo] = useState({
    name: "",
    description: "",
    feels_temp: "",
    temp: "",
    max_temp: "",
    min_temp: "",
  });
  const [checkSearch, setCheckSearch] = useState(false);

  const getLocation = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${api_key}&units=metric`,
      );
      const data = await res.json();
      console.log(data);
      setCheckSearch(true);
      setLocationInfo({
        ...locationInfo,
        name: `${data.name}`,
        description: `${data.weather[0].description}`,
        feels_temp: `${Math.round(data.main.feels_like)}C°`,
        temp: `${Math.round(data.main.temp)}C°`,
        max_temp: `${Math.round(data.main.temp_max)}C°`,
        min_temp: `${Math.round(data.main.temp_min)}C°`,
      });
    } catch (error) {
      console.error(error.response?.data)
    }
  };

  const addFavoriteLocation = async(e) => {
    e.preventDefault();
    try {
      const body = {location_name: locationName}
      const res = await axios.post("http://localhost:5000/save-location", body);
      console.log(res)
    } catch (error) {
      console.error(error.response?.data)
    }
  }

  return (
    <>
      {user ? (
        <div className="flex justify-center">
          <div className="text-center">
            <div>
              <form
                onSubmit={getLocation}
                className="container w-100 h-30 mt-20 rounded-md text-center"
              >
                <h2 className="mt-2">Weather App</h2>
                <div className="flex justify-center items-center gap-2 h-min p-2">
                  <label>Search:</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => {
                      setLocationname(e.target.value);
                    }}
                    className="border rounded-md p-0.5"
                  />
                </div>
              </form>
            </div>

            {checkSearch ? (
              <div className="container rounded-md h-80 mt-20 ">
                {locationInfo.name}
                {locationInfo.description}
                {locationInfo.feels_temp}
                {locationInfo.temp}
                {locationInfo.max_temp}
                {locationInfo.min_temp}

                <button onClick={addFavoriteLocation}>
                  <i className="fa-solid fa-arrow-up"></i>
                </button>
              </div>
            ) : (
              <div className="mt-20 container rounded-md p-4">
                <h2>Start Searching!!</h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="text-center">
            <div>
              <form
                onSubmit={getLocation}
                className="container w-100 h-30 mt-20 rounded-md text-center"
              >
                <h2 className="mt-2">Weather App</h2>
                <div className="flex justify-center items-center gap-2 h-min p-2">
                  <label>Search:</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => {
                      setLocationname(e.target.value);
                    }}
                    className="border rounded-md p-0.5"
                  />
                </div>
              </form>
            </div>

            {checkSearch ? (
              <div className="container rounded-md h-80 mt-20 ">
                {locationInfo.name}
                {locationInfo.description}
                {locationInfo.feels_temp}
                {locationInfo.temp}
                {locationInfo.max_temp}
                {locationInfo.min_temp}
              </div>
            ) : (
              <div className="mt-20 container rounded-md p-4">
                <h2>Start Searching!!</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
