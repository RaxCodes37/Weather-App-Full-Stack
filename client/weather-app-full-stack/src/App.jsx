import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { SavedLocations } from './pages/SavedLocations'

axios.defaults.withCredentials = true;

export const App = () => {
  const [user, setUser] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true)

  useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("/api/auth/me");
				setUser(res.data);
			} catch (err) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);
	
	if(loading){
		return <div>Loading...</div>;
	}

  return (
    <Router>
      <Navbar user={user} setUser={setUser}></Navbar>

      <Routes>
        <Route path='/' element={<Home error={error} user={user}/>}></Route>
        <Route path='/saved-locations' element={<SavedLocations user={user}/>}></Route>
        <Route path='/login' element={<Login setUser={setUser}/>}></Route>
        <Route path='/register' element={<Register setUser={setUser}/>}></Route>
        <Route path='*' element={<Navigate to='/'/>}></Route>
      </Routes>
    </Router>  
  )
}
