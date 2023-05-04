import "./MainLayout.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopBar from "../../components/TopBar/TopBar";
import UserForm from "../../components/UserForm/UserForm";
import UserEdit from "../../components/UserForm/UserEdit";
import ApplicantDetails from "../../components/ApplicantDetails/ApplicantDetails";
import ProfilePage from "../ProfilePage/ProfilePage";

const MainLayout = () => {
  return (
    <div className="row-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        {/* <UserForm formFunction="Create" /> */}
        {/* <UserEdit formFunction="Update" /> */}
        {/* <ApplicantDetails /> */}
        <ProfilePage />
      </div>
    </div>
  );
};

export default MainLayout;
