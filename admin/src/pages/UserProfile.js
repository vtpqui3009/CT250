import Layout from "../components/Layout";
import Profile from "../components/User/Profile";
const UserProfile = () => {
  return (
    <Layout
      chilren={
        <div className="w-full h-screen bg-bg-color">
          <Profile />
        </div>
      }
    />
  );
};
export default UserProfile;
