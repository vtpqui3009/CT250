const options = [5, 10, 15, 20];
const TableHeader = (props) => {
  return (
    <header className="table-heading">
      <div className="flex items-center">
        <span>Show</span>
        <select onChange={props.handleSelectChange} className="table-select">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <span>entries</span>
      </div>
      <form className="flex items-center">
        <span>Search :</span>
        <input
          type="text"
          onChange={props.handleInputCHange}
          className="table-input"
        />
      </form>
    </header>
  );
};
export default TableHeader;
