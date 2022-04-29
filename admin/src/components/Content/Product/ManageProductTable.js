import TableHeader from "../TableLayout/TableHeader";
// import TableFooter from "../TableLayout/TableFooter";
import ProductPagination from "./ProductPagination";
import Pagination from "../../../components/UI/Pagination";
import { Link } from "react-router-dom";
const ManageProductTable = (props) => {
  return (
    <div className="content ml-[5%] text-[12px]">
      <TableHeader
        handleSelectChange={props.handleSelectChange}
        handleInputChange={props.handleInputChange}
      />
      {props.productData.length === 0 && (
        <div className="flex items-center justify-center w-full py-10">
          <Link to="/product/new">
            No product available. Click here to add now
          </Link>
        </div>
      )}
      <Pagination
        data={props.productData}
        RenderComponent={ProductPagination}
        pageLimit={3}
        dataLimit={5}
      />
    </div>
  );
};
export default ManageProductTable;
