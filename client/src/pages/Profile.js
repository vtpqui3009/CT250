import React, { useState, useEffect } from "react";
import Navigation from "../components/Header/Navigation";
import Footer from "../components/Footer/Footer";
import axios from "axios";
const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/me`
        );
        const responseData = await response.data.user;
        setProfile(responseData);
      } catch (err) {}
    };
    fetchMyProfile();
  }, []);
  useEffect(() => {
    const fetchMyAddress = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API}/address/my`
        );
        const responseData = await response.data.address;
        console.log(responseData);
        setAddress(responseData);
      } catch (err) {}
    };
    fetchMyAddress();
  }, []);
  //   const avatar = profile ? profile.avatar.url : null;
  console.log(profile.length);
  console.log(address);
  return (
    <React.Fragment>
      <Navigation />
      {profile && (
        <div>
          {/* <img src={avatar} alt="" /> */}
          <div>
            <span>Name :</span>
            <span>{profile.name}</span>
          </div>
          <div>
            <span>Email :</span>
            <span>{profile.email}</span>
          </div>
        </div>
      )}
      {address && (
        <React.Fragment>
          <div>
            <span>Company :</span>
            <span>{address.company}</span>
          </div>
          <div>
            <span>Address :</span>
            <span>{address.address}</span>
          </div>
          <div>
            <span>Phone :</span>
            <span>{address.phoneNumber}</span>
          </div>
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
};
export default Profile;
