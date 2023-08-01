import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from 'react-router-dom';

const Featured = function() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSubmit = function() {
      navigate(`/quids?search=${input}`);
    };

    return (
        <div className="featured">
         <div className="container">
           <div className ="left">
            <h1>Good things come to those who <span>shop local!</span></h1>
            <div className="search">
            <div className="searchInput">
                <img src="./img/search.png" alt=""/>
                <input type="text" placeholder='Try "Fairhope, AL"' onChange={(e) => setInput(e.target.value)}/>
            </div>
            <button onClick = {handleSubmit}>Search</button>
            </div>
            <div className="popular">
                <span>Popular:</span>
                <button>Local Fare</button>
                <button>Pottery</button>
                <button>Boat Repair</button>
                <button>Theater</button>
            </div>
            </div>  
           <div className ="right"></div>
           <img src ="./img/woman.png" alt="" />
         </div>
        </div>
    )
}

export default Featured;

