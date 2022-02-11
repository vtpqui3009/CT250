import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Content from "../components/Content/Content";

const Home = () => {
  const [isActive, setIsActive] = useState(true);
  const handleToggleSidebar = () => {
    setIsActive((state) => !state);
  };
  return (
    <div className="flex">
      <Sidebar isActive={isActive} />

      <Content isActive={isActive} toggleSidebar={handleToggleSidebar} />
    </div>
  );
};
export default Home;
