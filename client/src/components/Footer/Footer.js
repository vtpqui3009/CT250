import FooterInfo from "./FooterInfo";
import FooterCategories from "./FooterCategories";
import FooterNewsLetter from "./FooterNewsLetter";
const Footer = () => {
  return (
    <footer className="flex lg:flex-row flex-col items-center w-full px-[5%] py-[3%] bg-footer-color text-gray-800 font-cairo">
      <FooterInfo />
      <FooterCategories />
      <FooterNewsLetter />
    </footer>
  );
};
export default Footer;
