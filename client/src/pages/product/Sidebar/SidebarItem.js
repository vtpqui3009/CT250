const SidebarItem = (props) => {
  return (
    <div style={props.style}>
      <input
        type="checkbox"
        name={props.name}
        onChange={props.onChange}
        value={props.label}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
      />
      <label htmlFor={props.id} className="ml-2">
        {props.label}
      </label>
    </div>
  );
};
export default SidebarItem;
