import { useState } from "react";
import Layout from "../components/Layout";
import HeadingPath from "../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../components/Content/HeadingPath/HeadingPathItem";
import ManageOrdersTable from "./Orders/MangeOrdersTable";
import Modal from "../components/UI/Modal";
import axios from "axios";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleDenyOrder = () => {
    setIsOpen(true);
  };

  return (
    <Layout
      chilren={
        <div className="w-full h-full bg-bg-color pt-[8%]">
          <HeadingPath
            heading="Manage Orders"
            chilren={
              <>
                <HeadingPathItem
                  pathname="Organic"
                  pathnameClass="text-gray-900"
                />
                <HeadingPathItem
                  pathname="Orders"
                  pathnameClass="text-gray-900"
                />
                <HeadingPathItem
                  pathname="Manage Orders"
                  pathnameClass="text-gray-400"
                  iconClass="hidden"
                />
              </>
            }
          />

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
