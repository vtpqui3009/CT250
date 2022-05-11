import React from "react";
import TableHeader from "../TableLayout/TableHeader";
// import TableFooter from "../TableLayout/TableFooter";
import { Link } from "react-router-dom";

const CustomerTable = (props) => {
  const handleSelectChange = () => {};
  const handleInputCHange = () => {};

  return (
    <div className="content ml-[5%] text-[12px]">
      <TableHeader
        handleSelectChange={handleSelectChange}
        handleInputCHange={handleInputCHange}
      />
      {props.customerData.length === 0 ? (
        <div className="flex items-center justify-center w-full py-10">
          No customer available
        </div>
      ) : (
        <table className="table-content">
          <thead className="border-b border-t border-gray-300">
            <tr>
              <th className="table-item">Name</th>
              <th className="table-item">Contact</th>
              <th className="table-item">Profile</th>
              <th className="table-item">Role</th>
            </tr>
          </thead>
          <tbody>
            {props.customerData.map((data, index) => (
              <tr
                className="border-b border-gray-300 text-center hover:bg-slate-200"
                key={index}
              >
                <td className="table-item">{data.name}</td>
                <td className="table-item">{data.email}</td>
                <td className=" text-center flex items-center justify-center p-2">
                  <img
                    src={data.avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </td>
                <td className="table-item">{data.role}</td>
                <td className="p-2 text-center">
                  <Link to={`/customer/edit/${data._id}`}>
                    <button className="table-edit__button">Edit</button>
                  </Link>
                </td>
                <td className="p-2 text-center">
                  <button
                    className="table-delete__button"
                    onClick={() => props.handleDeleteUser(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* <TableFooter /> */}
    </div>
  );
};
export default CustomerTable;
