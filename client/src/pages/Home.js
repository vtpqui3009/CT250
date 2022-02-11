import Header from "../components/Header/Header";
import Feature from "../components/Feature/Feature";
import Product from "../components/Product/Product";
import CallToAction from "../components/CallToAction/CallToAction";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";
import Image1 from "../img/apple.webp";
import Image2 from "../img/banana.webp";
import Image3 from "../img/avocado.jfif";
const Home = () => {
  useEffect(() => {}, []);
  return (
    <>
      {/* <div className="fixed inset-0 bg-input-color z-40 h-screen w-screen">
        <img src={Image1} alt="" className="loading-effect1" />
        <img src={Image2} alt="" className="loading-effect2" />
        <img src={Image3} alt="" className="loading-effect3" />
      </div> */}
      <Header />
      <Product />
      <Feature />
      <CallToAction />
      <Footer />
    </>
  );
};
export default Home;
