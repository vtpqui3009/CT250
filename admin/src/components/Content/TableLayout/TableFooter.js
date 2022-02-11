const TableFooter = ({ fromItem, toItem, totalItem }) => {
  return (
    <footer className="table-footer">
      <span>
        Showing {fromItem} to {toItem} of {totalItem} entries
      </span>
      <div className="flex items-center">
        <button className="table-actions">Previous</button>
        <ul className="flex items-center">
          <li className="border-[1px] border-sidebar-color px-[10px] py-1 bg-sidebar-color  text-white">
            1
          </li>
          <li className="table-page">2</li>
          <li className="table-page">3</li>
        </ul>
        <button className="table-actions">Next</button>
      </div>
    </footer>
  );
};
export default TableFooter;
