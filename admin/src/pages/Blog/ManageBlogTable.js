import { useState } from "react";
import TableHeader from "../../components/Content/TableLayout/TableHeader";
import TableFooter from "../../components/Content/TableLayout/TableFooter";
import { Link } from "react-router-dom";
import Tooltip from "../../components/UI/Tooltip";
const ManageBlogTable = (props) => {
  const [titleLastClicked, setTitleLastClicked] = useState(null);
  const [descLastClicked, setDescLastClicked] = useState(null);
  // const [contentLastClicked, setContentLastClicked] = useState(null);
  function handleOpenTitleTooltip(id) {
    setTitleLastClicked(id);
  }
  function handleCloseTitleTooltip() {
    setTitleLastClicked(0);
  }
  function handleOpenDescTooltip(id) {
    setDescLastClicked(id);
  }
  function handleCloseDescTooltip() {
    setDescLastClicked(0);
  }
  // function handleOpenContentTooltip(id) {
  //   setContentLastClicked(id);
  // }
  // function handleCloseContentTooltip() {
  //   setContentLastClicked(0);
  // }
  return (
    <div className="content ml-[5%] text-[12px] overflow-hidden">
      <TableHeader
        handleSelectChange={props.handleSelectChange}
        handleInputChange={props.handleInputChange}
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
                <td className="table-item">
                  <div className="relative">
                    <p
                      className="blog-title relative z-0"
                      onMouseEnter={() => handleOpenTitleTooltip(data._id)}
                      onMouseLeave={() => handleCloseTitleTooltip(data._id)}
                    >
                      {data.title}
                    </p>
                  </div>
                  <div className="absolute left-1/5 translate-y-[-80px] translate-x-4">
                    {titleLastClicked === data._id ? (
                      <Tooltip content={data.title} style={{ zIndex: "0" }} />
                    ) : null}
                  </div>
                </td>

                <td className="table-item">
                  <div className="relative">
                    <p
                      className="blog-description relative z-100"
                      onMouseEnter={() => handleOpenDescTooltip(data._id)}
                      onMouseLeave={() => handleCloseDescTooltip(data._id)}
                    >
                      {data.shortDescription}
                    </p>
                  </div>
                  <div className="absolute left-1/5 translate-y-[-100px] translate-x-4">
                    {descLastClicked === data._id ? (
                      <Tooltip
                        content={data.shortDescription}
                        style={{ zIndex: "40" }}
                      />
                    ) : null}
                  </div>
                </td>
                <td className="table-item text-center">
                  <img src={data.image.url} alt="" width={200} height={200} />
                </td>
                <td className="table-item">
                  <div className="relative">
                    <p
                      dangerouslySetInnerHTML={{ __html: data.content }}
                      className="blog-content relative"
                      // onMouseEnter={() => handleOpenContentTooltip(data._id)}
                      // onMouseLeave={() => handleCloseContentTooltip()}
                    />
                  </div>
                  {/* <div className="absolute left-2/5 translate-y-[-400px] translate-x-4 z-50">
                    {contentLastClicked === data._id && (
                      <Tooltip
                        content={data.content}
                        style={{ zIndex: "100", width: "100%" }}
                      />
                    )}{" "}
                  </div> */}
                </td>
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
