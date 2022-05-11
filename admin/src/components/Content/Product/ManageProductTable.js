import React from "react";
import TableHeader from "../TableLayout/TableHeader";
// import TableFooter from "../TableLayout/TableFooter";
import ProductPagination from "./ProductPagination";
import Pagination from "../../../components/UI/Pagination";
const ManageProductTable = (props) => {
  return (
    <React.Fragment>
      <div className="content ml-[5%] text-[12px]">
        <TableHeader
          handleSelectChange={props.handleSelectChange}
          handleInputChange={props.handleInputChange}
        />
        <Pagination
          data={props.productData}
          RenderComponent={ProductPagination}
          pageLimit={4}
          dataLimit={5}
        />
      </div>
    </React.Fragment>
  );
};
export default ManageProductTable;
