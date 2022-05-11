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

  // function goToNextPage() {
  //   setCurrentPage((page) => (page < pages ? page + 1 : page));
  // }

  // function goToPreviousPage() {
  //   setCurrentPage((page) => page - 1);
  // }

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
    // <React.Fragment>

    <React.Fragment>
      {data.length === 0 ? (
        <div className="text-center py-[15%]">
          There are no products available.
        </div>
      ) : (
        <React.Fragment>
          <table className={paginationClass}>
            <thead className="border-b border-t border-gray-300">
              <tr>
                <th className="table-item">Name</th>
                <th className="table-item">Description</th>
                <th className="table-item">Image</th>
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
          <div className="pagination">
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
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Pagination;
