import React from 'react';
import "./Slide.scss";
import Slider from "infinite-react-carousel";


const Slide = function({children, slidesToShow}) {
    return (
        <div className="slide">
            
                <div className="container">
            <Slider slidesToShow={slidesToShow}>
                {children}
            </Slider>
                </div>
            </div>
      
    )
}

export default Slide;   
              
// import Slider from 'react-slick';
// import NextArrow from "../../components/Arrows/NextArrow";
// import PrevArrow from "../../components/Arrows/PrevArrow";

// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// import './Slide.scss';

// const Slide = (props) => {
//   const { children, slidesToShow } = props;

//   const settings = {
//     infinite: true,
//     slidesToShow: slidesToShow,
//     slidesToScroll: slidesToShow,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     swipeToSlide: true,
//     responsive: [
//       {
//         breakpoint: 900,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   return (
//     <div className='slide-Container'>
//       <Slider {...settings}>
//         {children}
//       </Slider>
//     </div>
//   )
// }

// export default Slide;          