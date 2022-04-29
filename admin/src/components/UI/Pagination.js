import React, { useState } from "react";
import "./Pagination.css";
function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
  paginationClass,
}) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <div>
      <h1>{title}</h1>

      {/* show the posts, 10 posts at a time */}
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
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={d._id} data={d} />
        ))}
      </table>

      {/* show the pagiantion
              it consists of next and previous buttons
              along with page numbers, in our case, 5 page
              numbers at a time
          */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
          {/* <span> prev</span> */}
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "isActive" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
          {/* <span> next</span> */}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
