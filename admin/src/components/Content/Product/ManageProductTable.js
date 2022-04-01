import { useState } from "react";
import TableHeader from "../TableLayout/TableHeader";
import TableFooter from "../TableLayout/TableFooter";
import { Link } from "react-router-dom";
import Tooltip from "../../UI/Tooltip";
const ManageProductTable = (props) => {
  const [lastClicked, setLastClicked] = useState(null);
  const handleOpenTooltip = (id) => {
    setLastClicked(id);
  };
  const handleCloseTooltip = () => {
    setLastClicked(0);
  };
  return (
    <div className="content ml-[5%] text-[12px]">
      <TableHeader
        handleSelectChange={props.handleSelectChange}
        handleInputChange={props.handleInputChange}
      />
      {props.productData.length === 0 ? (
        <div className="flex items-center justify-center w-full py-10">
          <Link to="/product/new">
            No product available. Click here to add now
          </Link>
        </div>
      ) : (
        <table className="table-content">
          <thead className="border-b border-t border-gray-300">
            <tr>
              <th className="table-item">Name</th>
              <th className="table-item">Description</th>
              <th className="table-item">Image</th>
              <th className="table-item">Quantity</th>
              <th className="table-item">Price</th>
              <th className="table-item">Weight</th>
              <th className="table-item">Discount</th>
              <th className="table-item"></th>
              <th className="table-item"></th>
            </tr>
          </thead>
          <tbody>
            {props.productData.map((data, index) => (
              <tr key={index} className="border-b border-gray-300 text-center ">
                <td className="table-item">{data.name}</td>
                <td className="table-item ">
                  <div className="blog-content relative">
                    <p
                      className="relative"
                      onMouseEnter={() => handleOpenTooltip(data._id)}
                      onMouseLeave={() => handleCloseTooltip(data._id)}
                    >
                      {data.description}
                    </p>
                  </div>
                  <div className="absolute left-1/5 translate-y-[-120px] translate-x-4">
                    {lastClicked === data._id ? (
                      <Tooltip
                        content={data.description}
                        style={{ zIndex: "100" }}
                      />
                    ) : null}
                  </div>
                </td>
                <td className=" text-center">
                  <img
                    src={data.images[0].url}
                    alt=""
                    width={150}
                    height={150}
                  />
                </td>
                <td className="table-item">{data.quantity}</td>
                <td className="table-item">{data.price}</td>
                <td className="table-item">{data.weight}</td>
                <td className="table-item">{data.discount}</td>
                <td className="p-2 text-center">
                  <Link to={`/product/edit/${data._id}`}>
                    <button className="table-edit__button">Edit</button>
                  </Link>
                </td>
                <td className="p-2 text-center">
                  <button
                    className="table-delete__button"
                    onClick={() => props.onDeleteProduct(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <TableFooter
        fromItem={props.fromItem}
        toItem={props.toItem}
        totalItem={props.totalItem}
      />
    </div>
  );
};
export default ManageProductTable;
