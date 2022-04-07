import React from "react";
import Navigation from "../../components/Header/Navigation";
import TimelineNoti from "../../components/UI/Timeline/TimelineNoti";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/UI/Container";
const Notifications = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Container chilren={<TimelineNoti />} />
      <Footer />
    </React.Fragment>
  );
};
export default Notifications;
