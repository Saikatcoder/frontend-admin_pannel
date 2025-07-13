import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ListProduct = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/v1/list-product");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/remove-product",
        { id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  return (
    <div className="min-h-screen p-4 bg-black">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        All Products
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-10 w-10 text-green-500"
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
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full text-white border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Subcategory</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Sizes</th>
                  <th className="px-4 py-3">Bestseller</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center py-6 text-gray-400">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((product, index) => (
                    <tr
                      key={product._id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                      <td className="px-4 py-3">
                        {product.image?.length ? (
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-gray-400">
                            N/A
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.description}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">{product.subcategory || "-"}</td>
                      <td className="px-4 py-3">₹ {product.price}</td>
                      <td className="px-4 py-3">{product.size?.join(", ")}</td>
                      <td className="px-4 py-3">
                        {product.bestSeller ? (
                          <span className="bg-green-600 text-xs px-2 py-1 rounded">
                            Yes
                          </span>
                        ) : (
                          <span className="bg-red-600 text-xs px-2 py-1 rounded">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(product.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {currentItems.map((product,) => (
              <div
                key={product._id}
                className="border border-gray-700 rounded-lg p-4 bg-gray-900 text-white shadow"
              >
                <div className="flex gap-4">
                  {product.image?.length ? (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-700 rounded flex items-center justify-center text-gray-400">
                      N/A
                    </div>
                  )}
                  <div>
                    <h2 className="font-bold text-lg">{product.name}</h2>
                    <p className="text-sm text-gray-400">{product.description}</p>
                    <p className="text-sm">₹ {product.price}</p>
                    <p className="text-xs mt-1">
                      {product.category} - {product.subcategory || "-"}
                    </p>
                    <p className="text-xs">Sizes: {product.size?.join(", ")}</p>
                    <p className="text-xs">
                      {new Date(product.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.bestSeller
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {product.bestSeller ? "Bestseller" : "Not Bestseller"}
                  </span>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduct;
