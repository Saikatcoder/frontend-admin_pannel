import React, { useState } from "react";

import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets.js";
const AddProduct = ({token}) => {
  // Image states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Other states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
   
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestSeller", bestseller.toString());
      formData.append("subcategory", subCategory); 
      formData.append("sizes", JSON.stringify(sizes)); 


      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

     const response = await axios.post(
        backendUrl + "/api/v1/add-product",
        formData,
         {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  }
);
    if(response.data.success){
  toast.success(response.data.message);
  setName('');
  setDescription('');
  setImage1(null);
  setImage2(null);
  setImage3(null);
  setImage4(null);
  setPrice('');
}
else{
    toast.error(response.data.message)
  }
      
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-3xl bg-black rounded-xl shadow-xl p-8 space-y-6"
      >
        {/* Upload Images */}
        <div>
          <p className="text-gray-300 mb-2 font-semibold">Upload Images</p>
          <div className="flex gap-4 flex-wrap">
            {[
              { state: image1, setState: setImage1, id: "image1" },
              { state: image2, setState: setImage2, id: "image2" },
              { state: image3, setState: setImage3, id: "image3" },
              { state: image4, setState: setImage4, id: "image4" },
            ].map((img, idx) => (
              <label
                key={idx}
                htmlFor={img.id}
                className="cursor-pointer hover:opacity-80 transition"
              >
                <img
                  src={
                    img.state
                      ? URL.createObjectURL(img.state)
                      : assets.upload_area
                  }
                  alt=""
                  className="w-28 h-28 object-cover border-2 border-gray-700 rounded-lg"
                />
                <input
                  type="file"
                  id={img.id}
                  hidden
                  onChange={(e) => img.setState(e.target.files[0])}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="text-gray-300 mb-2 font-semibold">Product Name</p>
          <input
            type="text"
            placeholder="Type here"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="text-gray-300 mb-2 font-semibold">Product Description</p>
          <textarea
            placeholder="Type here"
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded resizes-none focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        {/* Product Category */}
        <div>
          <p className="text-gray-300 mb-2 font-semibold">Product Category</p>
          <select
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Sub Category */}
        <div>
          <p className="text-gray-300 mb-2 font-semibold">Sub Category</p>
          <select
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Fullsleeve">Full sleeve</option>
            <option value="Sleeveless">Sleeveless</option>
            <option value="PoloPlain">Polo Plain</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Sweatshirt">Sweatshirt</option>
            <option value="Oversizes">Oversizes</option>
          </select>
        </div>

        {/* Product Price */}
        <div>
          <p className="text-gray-300 mb-2 font-semibold">Product Price (₹)</p>
          <input
            type="number"
            placeholder="0.00"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        {/* sizess */}
        <div>
          <p className="text-gray-300 mb-2 font-semibold">Available sizess</p>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((sizesItem) => (
              <div
                key={sizesItem}
                className={`px-4 py-2 rounded cursor-pointer transition ${
                  sizes.includes(sizesItem)
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-white hover:bg-green-600"
                }`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(sizesItem)
                      ? prev.filter((s) => s !== sizesItem)
                      : [...prev, sizesItem]
                  )
                }
              >
                {sizesItem}
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestseller"
            className="w-5 h-5 text-green-500 bg-gray-800 border-gray-700 rounded focus:ring-green-500"
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
          />
          <label htmlFor="bestseller" className="text-gray-300">
            Mark as Bestseller
          </label>
        </div>

        {/* Submit Button */}
      <button
  type="submit"
  disabled={loading}
  className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition ${
    loading ? "cursor-not-allowed opacity-70" : ""
  }`}
>
  {loading && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
      ></path>
    </svg>
  )}
  {loading ? "Adding Product..." : "Add Product"}
</button>

      </form>
    </div>
  );
};

export default AddProduct;
