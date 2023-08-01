import axios from "axios";

const Upload = async function(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "quiddity");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dj6blyy6m/image/upload", data);

      const {url} = response.data;
      return url;
     }
    catch{
        console.log(err);
    }
};

export default Upload;