import "./MainLayout.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopBar from "../../components/TopBar/TopBar";
import UserForm from "../../components/UserForm/UserForm";
import ApplicantDetails from "../../components/ApplicantDetails/ApplicantDetails";
import ProfilePage from "../ProfilePage/ProfilePage";
import Applicants from "../Applicants";
const MainLayout = () => {
  return (
    <div className="row-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <Applicants/>
        {/* {<UserForm formFunction="Create" />} */}
        {/* <ApplicantDetails /> */}
        {/* <ProfilePage /> */}
      </div>
    </div>
  );
};

export default MainLayout;
