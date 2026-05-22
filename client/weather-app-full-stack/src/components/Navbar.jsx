import { Link, useNavigate} from "react-router-dom";
import "../styles/index.css";
import signUp from "../assets/sign-up.png";
import axios from "axios";

export const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const LogoutFunction = async() => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      setUser(null)
      navigate("/home")
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  return (
    <>
      {
        user ? (
          <div className="navbar border rounded-b-lg flex justify-center text-2xl">
            <div className="flex justify-between w-75">
              <Link to="/home" className="text-center">
                <i className="fa-solid fa-house"></i>
                <p className="text-[12px]">Home</p>
              </Link>

              <button className="hover:cursor-pointer" onClick={LogoutFunction}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <p className="text-[12px]">Log-out</p>
              </button>
            </div>
          </div>    
        ) : (
          <div className="navbar border rounded-b-lg flex justify-center text-2xl">
            <div className="flex justify-between w-100">
              <Link to="/home" className="text-center">
                <i className="fa-solid fa-house"></i>
                <p className="text-[12px]">Home</p>
              </Link>

              <Link to="/login" className="text-center">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <p className="text-[12px]">Login</p>
              </Link>

              <Link to="/register" className="justify-center">
                <img src={signUp} alt="sign-up" className="h-8 relative left-2"/>
                <p className="text-[12px]">Sign-Up</p>
              </Link>
            </div>
          </div>    
        )
      }
      
    </>
  );
};
