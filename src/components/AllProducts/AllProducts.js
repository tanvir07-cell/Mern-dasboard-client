import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import notFound from "../../images/notFound.svg";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  // for limit when user select (5,10,15,....etc)
  const [limit, setLimit] = useState(5);
  // for page number when user click page number :
  const [pageNumber, setPageNumber] = useState(0);

  // jei koyta data backend e ase sei koyta data er upor base koraei jate page gula(1,2,3,4,5,...etc dekhay:)
  const [totalPage, setTotalPage] = useState(0);

  // load data from the server that's why using useEffect:
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:5000/products?limit=${limit}=2&pageNumber=${pageNumber}`
      );
      // console.log(data);

      if (!data?.success) {
        setProducts([]);
        return toast.error(data.error);
      }
      // jodi backend the data ti ase that means success true hole nicher code gula:
      setProducts(data?.data);
      setTotalPage(data.count / limit);
    })();
  }, [limit, pageNumber]);

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-screen mx-5">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product name
            </th>
            <th scope="col" class="px-6 py-3">
              Product Price
            </th>
            <th scope="col" class="px-6 py-3">
              Image
            </th>

            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products?.map((product) => {
              return (
                <tr class="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {product?.name}
                  </th>

                  <td class="px-6 py-4">{product?.price}</td>
                  <td class="px-6 py-4">
                    <img src={product?.image} alt="" className="w-20" />
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>
              <img src={notFound} alt="" />
            </div>
          )}
        </tbody>
      </table>

      {/* for pagination: */}
      <div className="flex justify-end my-3">
        {[...Array(totalPage).keys()].map((page) => (
          <div
            className={`mx-3 border border-black py-1 px-3 cursor-pointer ${
              pageNumber === page ? "bg-black text-white" : " "
            }`}
            onClick={() => setPageNumber(page)}
          >
            {page + 1}
          </div>
        ))}

        <select
          defaultValue={limit}
          onChange={(event) => setLimit(event.target.value)}
        >
          <option value="2">2</option>
          <option value="5">5</option>

          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default AllProducts;
