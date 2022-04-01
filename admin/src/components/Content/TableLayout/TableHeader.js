// import { UilSearchAlt } from "@iconscout/react-unicons";
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
      <form
        className="flex items-center text-[14px]"
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
