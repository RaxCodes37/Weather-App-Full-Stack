import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const Register = ({ setUser }) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const LoginFunction = async (e) => {
    e.preventDefault();
    try {      
      const res = await axios.post("/api/auth/register", form);

      setUser(res.data.user);

      navigate("/")
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  
  return (
    <>
      <div className="w-screen h-[80vh] flex justify-center">
        <form className="container border rounded-md w-100 h-64 text-center mt-20" onSubmit={LoginFunction}>
          <h2 className="mt-5">Sign-Up</h2>

          <div className="text-center mt-5">
            <input
              type="text"
              placeholder="User Name"
              required
              value={form.username}
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
              className="border rounded-md w-70 p-0.5"
            />
          </div>

          <div className="text-center mt-2">
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              className="border rounded-md w-70 p-0.5"
            />
          </div>

          <div className="flex justify-center gap-2.5 mt-2">
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              className="border rounded-md w-60 p-0.5"
            />
            <button onClick={LoginFunction} className="border p-0.5 px-1.5 rounded-md duration-300 hover:bg-[#182825] hover:text-[#92b2c3]">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <p className="mt-5">If you already have an account please <Link to="/login" className="underline">Log-In</Link></p>
        </form>
      </div>
    </>
  )
}
