import React, { useEffect, useState } from 'react';
import "./Navbar.scss";
import newRequest from '../../utils/newRequest';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = function() {
    const [active, setActive] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const {pathname} = useLocation();

    const isActive = function() {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    useEffect(function() {
     window.addEventListener("scroll", isActive);

     return function () {
        window.removeEventListener("scroll", isActive);
     }
    },[]); 

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate();

    const handleLogout = async function () {
        try{
           await newRequest.post("/auth/logout");
           localStorage.setItem("currentUser", null);
           navigate("/")                                 //navigate to home page
        }
        catch (err) {
           console.log(err)
        }
    };

    return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className="link">
                    <span className='text'>quiddity</span>
                    </Link>
                  
                  <span className='dot'>.</span>
                </div>

            <div className="links">
                
                   <span>Quiddity Business</span>
          <span>Events</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpenMenu(!openMenu)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {openMenu && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myQuids">
                        Quids
                      </Link>
                      <Link className="link" to="/add">
                        Add New Quid
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>

        {(active || pathname !== "/") && (
        <>
        {/* <hr />
        <div className="menu">
            <Link className = "link menuLink" to="/">
            Local Fare
            </Link>
            <Link className = "link" to="/">
            Events
            </Link>
            <Link className = "link" to="/">
            Health and Beauty 
            </Link>
            <Link className = "link" to="/">
            Farmers Markets
            </Link>
            <Link className = "link" to="/">
            Arts and Crafts
            </Link>
            <Link className = "link" to="/">
            Business
            </Link>
        </div>
        <hr /> */}
       </>
        )}
        
     </div>

   );
};

export default Navbar;
    
                     