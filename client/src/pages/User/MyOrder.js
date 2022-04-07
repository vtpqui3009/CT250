import TimelineOrders from "../../components/UI/Timeline/TimelineOrders";
import Navigation from "../../components/Header/Navigation";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/UI/Container";
const MyOrder = () => {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <Container chilren={<TimelineOrders />} />
      <Footer />
    </div>
  );
};
export default MyOrder;
