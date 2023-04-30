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
<<<<<<< HEAD
        <UserForm formFunction="Edit" />
=======
        {/* <UserForm formFunction="Edit" /> */}
>>>>>>> bba20bbd7cc8122558e56e17f76b213466f36d63
        {/* <ApplicantDetails /> */}
      </div>
    </div>
  );
};

export default MainLayout;
