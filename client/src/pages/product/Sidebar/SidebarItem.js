const SidebarItem = (props) => {
  return (
    <div style={props.style}>
      <input
        type="checkbox"
        name={props.radioName}
        onChange={props.handleradioChange}
        value={props.label}
        {...props}
      />
      <label htmlFor={props.id} className="ml-2">
        {props.label}
      </label>
    </div>
  );
};
export default SidebarItem;
