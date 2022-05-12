import { useEffect } from "react";
import Layout from "../components/Layout";
import ManageOrdersTable from "./Orders/MangeOrdersTable";
import HeadingPath from "../components/Content/HeadingPath/HeadingPath";
import HeadingPathItem from "../components/Content/HeadingPath/HeadingPathItem";
import Widget from "../components/UI/Widget";
const Home = () => {
  useEffect(() => {
    document.title = "Organic Dashboard";
  }, []);
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
          <div className="grid grid-cols-4 h-max gap-5 px-[9%]">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <ManageOrdersTable />
        </div>
      }
    />
  );
};
export default Home;
