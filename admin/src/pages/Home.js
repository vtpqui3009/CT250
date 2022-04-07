import { useState, useEffect } from "react";
import Layout from "../components/Layout";
// import {useSelector} from "react-redux"
import ManageOrdersTable from "./Orders/MangeOrdersTable";
import Modal from "../components/UI/Modal";
import HeadingPath from "../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../components/Content/HeadingPath/HeadingPathItem";
import Widget from "../components/UI/Widget";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.title = "Organic Dashboard";
  }, []);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleDenyOrder = () => {
    setIsOpen(true);
  };

  return (
    <Layout
      chilren={
        <div className="w-full h-full bg-bg-color pt-[4%]">
          <HeadingPath
            heading="Dashboard"
            chilren={
              <>
                <HeadingPathItem
                  pathname="Organic"
                  pathnameClass="text-gray-900"
                />
                <HeadingPathItem
                  pathname="Dashboard"
                  pathnameClass="text-gray-500"
                  iconClass="hidden"
                />
              </>
            }
          />
          <div className="grid grid-cols-4 h-32 gap-5 px-[9%] pt-[2%]">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          {isOpen && (
            <Modal
              onCloseModal={handleCloseModal}
              header="Deny Order Dialog"
              content={
                <form className="w-full relative text-[14px]">
                  <input
                    placeholder="Please enter the reason why you deny this order."
                    className="w-full rounded border border-gray-400 outline-none focus:outline-none px-4 py-2"
                  />
                  <button className="absolute right-0 border bg-sidebar-color text-white px-4 py-2">
                    Send
                  </button>
                </form>
              }
            />
          )}

          <ManageOrdersTable onDenyOrder={handleDenyOrder} />
        </div>
      }
    />
  );
};
export default Home;
