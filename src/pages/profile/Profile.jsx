import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Profile.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";



function Profile() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    img: "",
    isSeller: false,
    desc: "",
  });

  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };          //useState
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Edit Profile</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="annadoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />

          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          
          <label htmlFor="">Location</label>
          <input
            name="location"
            type="text"
            placeholder="Fairhope, AL"
            onChange={handleChange}
          />
          <button type="submit">Submit Changes</button>
        </div>
        <div className="right">
          <h1>Become A Seller!</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 8900"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="Description of yourself or business"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Profile;