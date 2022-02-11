import NavbarList from "./NavbarList";
const Navbar = (props) => {
  return (
    <nav className="hidden md:block ml-[-45px]">
      <NavbarList />
    </nav>
  );
};
export default Navbar;
