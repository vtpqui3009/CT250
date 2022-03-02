import TableHeader from "../../components/Content/TableLayout/TableHeader";
import TableFooter from "../../components/Content/TableLayout/TableFooter";
import { Link } from "react-router-dom";

const ManageBlogTable = (props) => {
  return (
    <div className="content ml-[5%] text-[12px]">
      <TableHeader
        handleSelectChange={props.handleSelectChange}
        handleInputCHange={props.handleInputChange}
      />
      {props.blogData.length === 0 ? (
        <div className="flex items-center justify-center w-full py-10">
          <Link to="/product/new">
            No product available. Click here to add now
          </Link>
        </div>
      ) : (
        <table className="table-content">
          <thead className="border-b border-t border-gray-300">
            <tr>
              <th className="table-item">Title</th>
              <th className="table-item">Short Description</th>
              <th className="table-item">Image</th>
              <th className="table-item">Content</th>
              <th className="table-item"></th>
              <th className="table-item"></th>
            </tr>
          </thead>
          <tbody>
            {props.blogData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 text-center hover:bg-slate-200"
              >
                <td className="table-item">{data.title}</td>
                <td className="table-item">{data.shortDescription}</td>
                <td className="table-item text-center">
                  <img src={data.image.url} alt="" width={200} height={200} />
                </td>
                <td className="table-item">{data.content}</td>
                <td className="p-2 text-center">
                  <Link to={`/blog/edit/${data._id}`}>
                    <button className="table-edit__button">Edit</button>
                  </Link>
                </td>
                <td className="p-2 text-center">
                  <button
                    className="table-delete__button"
                    onClick={() => props.onDeleteBlog(data._id)}
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
export default ManageBlogTable;
