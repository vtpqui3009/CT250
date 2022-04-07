import Header from "../components/Header/Header";
import Feature from "../components/Feature/Feature";
import Product from "../components/Product/Product";
import Blog from "./Blog/Blog";
import CallToAction from "../components/CallToAction/CallToAction";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Organic Food";
  }, []);
  return (
    <div className="flex flex-col">
      <Header />
      <Product />
      <Feature />
      <Blog />
      <CallToAction />
      <div className="mt-auto">
        {" "}
        <Footer />
      </div>
    </div>
  );
};
export default Home;
