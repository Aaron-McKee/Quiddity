// import React, {useReducer} from 'react';
// import "./Add.scss";
// import { quidReducer, INITIAL_STATE } from '../../reducers/quidReducer';

// const Add = function() {

//     const [singleFile, setSingleFile] = useState(undefined);
//     const [Files, setFiles] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [state, dispatch] = useReducer(quidReducer, INITIAL_STATE);

//     return (
//         <div className='add'>
//             <div className='container'>
//                 <h1>Add New Quid</h1>
//                 <div className="sections">
//                     <div className="left">
//                         <label htmlFor="">Title</label>
//                         <input type="text" name="title" placeholder="Company Name" 
//                         onChange = {handleChange} />
//                         <label htmlFor="">Category</label>
//                         <select name="cat" id="cat" onChange = {handleChange}>
//                         <option value="fare">Local Fare</option>
//                         <option value="events">Animal Care</option>
//                         <option value="art">Art and Design</option>
//                         <option value="health">Health and Beauty</option>
//                         </select>
//                         <label htmlFor="">Cover Image</label>
//                         <input type="file" />
//                         <label htmlFor="">Upload Images</label>
//                         <input type="file" multiple />
//                         <label htmlFor="">Description</label>
//                         <textarea name="desc" id="" cols="30" rows="16"
//                         onChange = {handleChange}
//                          placeholder="Brief description to introduce your product or service to customers"></textarea>
//                         <button>Create</button> 
//                         </div>
//                         <div className="details">
//                             <label htmlFor="" >Order / Service Title</label>
//                             <input type="text" placeholder="e.g. Wedding Cake and Dessert Table" />
//                             <label htmlFor="" >Short Description</label>
//                             <textarea name ="" id="" cols="30" rows="10"
//                             placeholder="Short description of your product or service" />
//                             <label htmlFor="" >Delivery Time</label>
//                             <input type = "number" min={1} placeholder="e.g. 3 days"/>
//                             <label htmlFor="" >Add Items or Features</label>
//                             <input type="text" placeholder="e.g. 4 Layer Wedding Cake" />
                            
//                             <label htmlFor="" >Price</label>
//                             <input type="number" min={1} />

//                         </div>
//                     </div>

//                 </div>
//             </div>
      
//     )
// }

// export default Add;

import React, { useReducer, useState } from "react";
import "./Add.scss";
import { quidReducer, INITIAL_STATE } from "../../reducers/quidReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(quidReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (quid) => {
      return newRequest.post("/quids", quid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myQuids"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myquids")
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Quid</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Company Name"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
             <option value="fare">Local Fare</option>
             <option value="animal">Animal Care</option>
             <option value="art">Art and Design</option>
             <option value="health">Health and Beauty</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;