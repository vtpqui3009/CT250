import React, { useState } from "react";
const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = [];
  const [activePage, setActivePage] = useState(1);
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <ul className="flex items-center w-[76%] ml-[12%] my-4">
      {pageNumbers.length === 1 ? (
        <div></div>
      ) : (
        <>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className="border-[1px] border-base-color px-3 py-1 mr-4 rounded-full cursor-pointer"
              style={{
                backgroundColor: number === activePage ? "#97AE76" : "",
                color: number === activePage ? "white" : "",
              }}
              onClick={() => {
                setActivePage(number);
              }}
            >
              <span onClick={() => paginate(number)}>{number}</span>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
export default Pagination;
