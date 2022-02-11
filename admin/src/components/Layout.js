import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
const Layout = (props) => {
  const [isActive, setIsActive] = useState(true);
  const handleToggleSidebar = () => {
    setIsActive((state) => !state);
  };
  return (
    <div className="flex">
      <Sidebar isActive={isActive} />
      <Content isActive={isActive} toggleSidebar={handleToggleSidebar}>
        {props.chilren}
      </Content>
    </div>
  );
};
export default Layout;
