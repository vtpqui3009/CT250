const UserDropdownItem = ({ icon, text, other, otherClassName, onClick }) => {
  return (
    <li className="menu-dropdown__item" onClick={onClick}>
      {icon}
      <div className={otherClassName}>
        <span>{text}</span>
        <span>{other}</span>
      </div>
    </li>
  );
};
export default UserDropdownItem;
