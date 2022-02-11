const Input = (props) => {
  return (
    <div className="w-full">
      <label htmlFor={props.id} className="block my-2 font-bold">
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        className="border-[1px]  text-gray-700 border-gray-100 outline-none bg-gray-100 w-full p-3 hover:bg-base-color ease-linear duration-200 rounded-[2px] hover:text-white focus:bg-base-color focus:text-white"
        required
        autoComplete="off"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
export default Input;
