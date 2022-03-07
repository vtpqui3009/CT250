import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const Pagination = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const dataPerPage = props.dataPerPage;
  const pagesVisited = pageNumber * dataPerPage;

  const displayData = props.data
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((product) => (
      <div key={product._id}>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images[0].url}
            alt=""
            className="w-full h-[200px] object-cover"
          />
        </Link>

        <div className="text-center">
          <Link to={`/product/${product._id}`}>
            {" "}
            <div>{product.name}</div>{" "}
          </Link>
          <div>
            {product.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
      </div>
    ));
  const pageCount = Math.ceil(props.data.length / dataPerPage);
  const handlePageChange = (selected) => {
    setPageNumber(selected.selected);
    console.log(selected);
  };
  return (
    <>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-[2%] md:mb-[8%]  mb-[55vh]">
        {displayData}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
};
export default Pagination;
