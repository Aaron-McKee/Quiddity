import React from 'react';
import { Link } from "react-router-dom";
import "./CategoryCard.scss";

const CategoryCard = function({card}) {
    return (
    <Link to="/quids?category=Animal Care">
        
            <div className='categoryCard'>
                <img src={card.img} alt="" />
                <span className='description'>{card.description}</span>
                <span className='title'>{card.title}</span>
            </div>
    </Link>    
    
    )
}

export default CategoryCard;