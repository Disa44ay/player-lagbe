import React, { useEffect, useState } from "react";
import "./AddItems.css";
import { assets } from "../../src/assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddItems = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  /*to check if the data is handeled properly from console
  useEffect(()=>{
    console.log(data);
  },[data])
*/

  //API
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    //call API
    const response = await axios.post(`${url}/api/item/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: ""
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="addItems">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.icon_upload}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-item-name flex-col">
          <p>Item name</p>
          <input
            onChange={onChangehandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-item-description flex-col">
          <p>Item Description</p>
          <textarea
            onChange={onChangehandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-item-price">
          <div className="add-category flex-col">
            <p>Item category</p>
            <select onChange={onChangehandler} name="category">
              <option value="football">Football</option>
              <option value="jersey">Jersey</option>
              <option value="shinguard">Shinguard</option>
              <option value="turf-boots">Turf boots</option>
              <option value="training-cone">Training cone</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Item price</p>
            <input
              onChange={onChangehandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add item
        </button>
      </form>
    </div>
  );
};

export default AddItems;
