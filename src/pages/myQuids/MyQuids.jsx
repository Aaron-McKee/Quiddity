

// import React from "react";
// import { Link } from "react-router-dom";
// import "./MyQuids.scss";
// import getCurrentUser from "../../utils/getCurrentUser";

// function MyQuids() {
//   const currentUser = getCurrentUser()
  

//   return (
//     <div className="myQuids">
//       <div className="container">
//         <div className="title">
//           <h1>{currentUser.isSeller ? "Quids" : "Orders"}</h1>
//           {currentUser.isSeller && (
//             <Link to="/add">
//               <button>Add New Quid</button>
//             </Link>
//           )}
//         </div>
//         <table>
//           <tr>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Sales</th>
//             <th>Action</th>
//           </tr>
//           <tr>
//             <td>
//               <img
//                 className="image"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Stunning concept art</td>
//             <td>$59.<sup>99</sup></td>
//             <td>13</td>
//             <td>
//               <img className="delete" src="./img/delete.png" alt="" />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <img
//                 className="image"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Ai generated concept art</td>
//             <td>$120.<sup>99</sup></td>
//             <td>41</td>
//             <td>
//               <img className="delete" src="./img/delete.png" alt="" />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <img
//                 className="image"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>High quality digital character</td>
//             <td>$79.<sup>99</sup></td>
//             <td>55</td>
//             <td>
//               <img className="delete" src="./img/delete.png" alt="" />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <img
//                 className="image"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Illustration hyper realistic painting</td>
//             <td>$119.<sup>99</sup></td>
//             <td>29</td>
//             <td>
//               <img className="delete" src="./img/delete.png" alt="" />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <img
//                 className="image"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Original ai generated digital art</td>
//             <td>$59.<sup>99</sup></td>
//             <td>34</td>
//             <td>
//               <img className="delete" src="./img/delete.png" alt="" />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <img
//                 className="image"
//                 src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                 alt=""
//               />
//             </td>
//             <td>Text based ai generated art</td>
//             <td>$110.<sup>99</sup></td>
//             <td>16</td>
//             <td>
//               <img className="delete" src="./img/delete.png" alt="" />
//             </td>
//           </tr>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default MyQuids;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyQuids.scss";
// import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyQuids() {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const navigate = useNavigate();                          //not working
  const { isLoading, error, data } = useQuery({            //need to just get currentusers quids only
    queryKey: ["myQuids"],
    queryFn: () =>
      newRequest.get(`/quids`).then((res) => {
        return res.data;

      }),
  });
console.log(data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/quids/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myQuids"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myQuids">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Quids</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Quid</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
           <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
           {data.map((quid) => (
              <tr key={quid._id} >
                <td>
                  <img className="image" src={quid.cover} alt="" />
                </td>
                <td>{quid.title}</td>
                <td>{quid.price}</td>
                <td>{quid.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(quid._id)}
                  />
                </td>
              </tr>
              
              ))}
            </tbody>
          </table>
           
        </div>
      )}
    </div>
  );
  
}
             

export default MyQuids;





           


           