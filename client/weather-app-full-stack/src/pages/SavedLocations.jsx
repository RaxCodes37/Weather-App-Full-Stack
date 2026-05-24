import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const SavedLocations = ({ user }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

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
  
  return (
    <>
      {user ? (
        <div className="flex justify-center">
          
          <div className="container rounded-md min-h-40 w-100 mt-20 text-center">
            <h2 className="underline">Saved Locations</h2>
            {locations.map((location) => (
              <div>
                {location.location_name}
              </div>
            ))}
          </div>
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
