import "./MainLayout.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopBar from "../../components/TopBar/TopBar";
import UserForm from "../../components/UserForm/UserForm";
import ApplicantDetails from "../../components/ApplicantDetails/ApplicantDetails";

const MainLayout = () => {
  return (
    <div className="row-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        {/* <UserForm formFunction="Edit" /> */}
        {/* <ApplicantDetails /> */}
      </div>
    </div>
  );
};

export default MainLayout;
