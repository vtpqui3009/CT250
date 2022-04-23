const TableHeader = (props) => {
  return (
    <header className="table-heading">
      <form
        className="flex items-center text-[14px] ml-auto"
        // onSubmit={props.handleSubmit}
      >
        <span>Search :</span>
        <input
          type="text"
          className="table-input"
          onChange={props.handleInputChange}
        />
        {/* <button type="submit">
          <UilSearchAlt className="h-5 w5" />
        </button> */}
      </form>
    </header>
  );
};
export default TableHeader;
