import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/index.css"

export const Home = ({ error, user }) => {
  const [locationName, setLocationname] = useState("");
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

  const getLocation = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${api_key}&units=metric`,
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

  const addFavoriteLocation = async (e) => {
    e.preventDefault();
    try {
      const body = {
        location_name: locationName,
        location_country: locationInfo.country,
      };
      const res = await axios.post("http://localhost:5000/save-location", body);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

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
                  <button
                    onClick={getLocation}
                    className="search-button rounded-md"
                  >
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                </div>
              </form>
            </div>

            {checkSearch ? (
              <div className="container rounded-md min-h-20 mt-10 py-3">
                <div className="flex justify-center items-center">
                  <div className="flex items-center justify-center w-[90%] gap-2">
                    <h2>
                      {locationInfo.name}, {locationInfo.country}
                    </h2>
                    <i className="fa-solid fa-location-dot text-xl"></i>
                  </div>

                  <button onClick={addFavoriteLocation}>
                    <i className="fa-solid fa-bookmark text-xl"></i>
                  </button>
                </div>
                <div>
                  <p>{locationInfo.description}</p>
                </div>
                <hr className="my-2" />
                <div>
                  <h3>{locationInfo.temp}</h3>
                  <p>
                    <span className="opacity-50">
                      Feels Like: {locationInfo.feels_temp}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <p>
                    <span className="opacity-50">
                      Max: {locationInfo.max_temp}
                    </span>
                  </p>

                  <p>
                    <span className="opacity-50">
                      Min: {locationInfo.min_temp}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-10 container rounded-md p-4">
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
                  <button
                    onClick={getLocation}
                    className="search-button rounded-md"
                  >
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                </div>
              </form>
            </div>

            {checkSearch ? (
              <div className="container rounded-md min-h-20 mt-10 py-3">
                <div className="flex justify-center items-center">
                  <div className="flex items-center justify-center w-[90%] gap-2">
                    <h2>
                      {locationInfo.name}, {locationInfo.country}
                    </h2>
                    <i className="fa-solid fa-location-dot text-xl"></i>
                  </div>
                </div>
                <div>
                  <p>{locationInfo.description}</p>
                </div>
                <hr className="my-2" />
                <div>
                  <h3>{locationInfo.temp}</h3>
                  <p>
                    <span className="opacity-50">
                      Feels Like: {locationInfo.feels_temp}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <p>
                    <span className="opacity-50">
                      Max: {locationInfo.max_temp}
                    </span>
                  </p>

                  <p>
                    <span className="opacity-50">
                      Min: {locationInfo.min_temp}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-10 container rounded-md p-4">
                <h2>Start Searching!!</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
