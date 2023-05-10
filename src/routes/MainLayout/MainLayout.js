import "./MainLayout.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopBar from "../../components/TopBar/TopBar";
import Applicants from "../Applicants";

const MainLayout = () => {
  return (
    <div className="row-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
      </div>
    </div>
  );
};

export default MainLayout;
